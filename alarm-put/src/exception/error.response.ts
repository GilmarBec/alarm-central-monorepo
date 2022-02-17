import { ErrorResponse } from '../../../common/exceptions/error.response';

export class AlarmErrorResponse extends ErrorResponse {
    static ALARM_STATUS_INVALID = new ErrorResponse('alarm-0001', 'Alarm status given isn\'t valid');
}
