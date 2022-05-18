/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubscriptionContract } from './subscription-contract';
export { SubscriptionContract } from './subscription-contract';
import { ElectronicContract } from './electronic-contract';
export { ElectronicContract } from './electronic-contract';
import { AttendanceContract } from './attendance-contract';
export { AttendanceContract } from './attendance-contract';

export const contracts: any[] = [SubscriptionContract, ElectronicContract, AttendanceContract];
