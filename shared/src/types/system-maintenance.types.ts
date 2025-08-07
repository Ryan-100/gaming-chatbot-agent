import { z } from "zod"

export const systemMaintenanceSchema = z.object({ systemMaintenance: z.boolean() })

export type SystemMaintenanceData = z.infer<typeof systemMaintenanceSchema>;