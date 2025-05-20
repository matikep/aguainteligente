import * as z from "zod";

export const settingsSchema = z.object({
    automationEnabled: z.boolean().default(true),
    defaultHumidityThreshold: z.array(z.number().min(0).max(100)).length(1).default([60]),
    checkInterval: z.enum(['15min', '30min', '1hr', '2hr']).default('1hr'),
    iotConnectionString: z.string().optional(),
    alertNotificationsEnabled: z.boolean().default(true),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>; 