/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElectronicContract } from './electronic-contract';
export { ElectronicContract } from './electronic-contract';
import { AttendanceContract } from './attendance-contract';
export { AttendanceContract } from './attendance-contract';
import { TransferContract } from './transfer-contract';
export { TransferContract } from './transfer-contract';

export const contracts: any[] = [ElectronicContract, AttendanceContract, TransferContract];
