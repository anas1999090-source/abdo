import { WHATSAPP_PHONE } from '../data/packData';

export function getWhatsAppOrderUrl(details: {
  fullName?: string;
  phone?: string;
  city?: string;
  address?: string;
  offerTitle?: string;
  price?: number;
  orderId?: string;
}) {
  let message = `السلام عليكم ورحمة الله،\n`;

  if (details.orderId) {
    message += `بغيت نأكد طلبي رقم: *${details.orderId}*\n`;
  } else {
    message += `بغيت نطلب باك فيتاكر لعلاج تساقط الشعر\n`;
  }

  if (details.offerTitle) {
    message += `📦 *العرض المختار:* ${details.offerTitle}\n`;
  }
  if (details.price) {
    message += `💰 *المبلغ الإجمالي:* ${details.price} درهم (توصيل بالمجان)\n`;
  }
  if (details.fullName) {
    message += `👤 *الاسم:* ${details.fullName}\n`;
  }
  if (details.phone) {
    message += `📱 *الهاتف:* ${details.phone}\n`;
  }
  if (details.city) {
    message += `📍 *المدينة:* ${details.city}\n`;
  }
  if (details.address) {
    message += `🏠 *العنوان:* ${details.address}\n`;
  }

  message += `\nعفاك أكدو ليا الطلب باش نوجد راسي للاستلام والدفع عند التسليم. شكراً!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppInquiryUrl(productName?: string) {
  const text = productName
    ? `السلام عليكم معشبة ريحاب، بغيت نسولكم على ${productName} وطريقة الاستعمال ديالو عفاكم.`
    : `السلام عليكم معشبة ريحاب، عندي استفسار على باك فيتاكر لعلاج تساقط الشعر وطريقة التوصيل.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
