import RfidAccessKey from '../infra/typeorm/entities/RfidAccessKey';

export default interface ICreateRfidAccessLogDTO {
  rfid_access_key: RfidAccessKey;
  blocked_access?: boolean;
  why?: string;
}
