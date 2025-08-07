import { z } from "zod"

export const otpSettingSchema = z.object({
  id: z.string(),
  maxAttemptOtp: z.number(),
  maxWrongOtp: z.number(),
  maxWrongPsw: z.number(),
  otpExpireTime: z.number(),
  otpExpireType: z.string(),
  otpLockTime: z.number(),
  otpLockType: z.string(),
  createdById: z.string(),
  updatedById: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type OtpSettingData = z.infer<typeof otpSettingSchema>;

export const otpSettingEditSchema = otpSettingSchema.pick({
  maxAttemptOtp: true,
  maxWrongOtp: true,
  maxWrongPsw: true,
  otpExpireTime: true,
  otpExpireType: true,
  otpLockTime: true,
  otpLockType: true,
});

export type OtpSettingEditForm = z.infer<typeof otpSettingEditSchema>;
