import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });
    await updateUserAvatar.execute({
      avatarFileName: 'avatar.png',
      user_id: user.id,
    });
    expect(user.avatar).toBe('avatar.png');
  });
  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        avatarFileName: 'avatar.png',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });
    await updateUserAvatar.execute({
      avatarFileName: 'avatar.png',
      user_id: user.id,
    });
    await updateUserAvatar.execute({
      avatarFileName: 'avatar1.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(user.avatar).toBe('avatar1.png');
  });
});
