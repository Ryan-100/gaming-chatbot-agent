import { ContactSupportData, contactSupportListSchema, SocialPlatformsData, socialPlatformsListSchema } from "./type";

export const generateContactSupportData = (): ContactSupportData[] =>{
  const data:ContactSupportData[] = [
    {
      "id": 1,
      "support_type": "Phone",
      "number_address": "09123456789",
      "is_publish": true,
    },
    {
      "id": 2,
      "support_type": "Email",
      "number_address": "admin1@gmail.com",
      "is_publish": true,
    },
    {
      "id": 3,
      "support_type": "Phone",
      "number_address": "09123456789",
      "is_publish": false,
    },
  ]
  ;
    return data.filter(
      (mockCourse) => contactSupportListSchema.safeParse(mockCourse).success
    );
}

export const generateSocialPlatformsData = (): SocialPlatformsData[] =>{
  const data:SocialPlatformsData[] = [
    {
      "id": 1,
      "social_app": "/upload/images/dashboard-msg.png",
      "link": "https://www.facebook.com/zgamingbox",
      "is_publish": true,
    },
    {
      "id": 2,
      "social_app": "/upload/images/dashboard-report.png",
      "link": "admin1@gmail.com",
      "is_publish": true,
    },
    {
      "id": 3,
      "social_app": "/upload/images/dashboard-trx.png",
      "link": "wxid_svag8sfalk3p5ip22",
      "is_publish": false,
    },
    {
      "id": 4,
      "social_app": "/upload/images/dashboard-user.png",
      "link": "09123456789",
      "is_publish": false,
    },
  ]
  ;
    return data.filter(
      (mockCourse) => socialPlatformsListSchema.safeParse(mockCourse).success
    );
}