/* ============================================================
   أكاديمية أثر — بيانات الموقع القابلة للتعديل
   ============================================================
   لإضافة رأي ولي أمر:
     1) ضع صورته في assets/images/testimonials/ (ويُفضّل نسخة مصغّرة عرضها 640px)
     2) أضف سطرًا جديدًا في testimonials: img (الأصل) + thumb (المصغّرة) + alt بالعربية + altEn بالإنجليزية
        صِف مضمون الرأي في alt دون ذكر أسماء أشخاص.

   لإضافة شهادة إنجاز:
     1) ضع الصورة في assets/images/achievements/
     2) أضف سطرًا في achievements: img + thumb + alt/altEn (وصف كامل) + title/titleEn (اسم الطالب) + cap/capEn (سطر الإنجاز)
   لا تنشر أسماء أو صور طلاب إلا بعد موافقة ولي الأمر.
   ============================================================ */
window.ASAR_DATA = {
  whatsapp: '201041175976',

  testimonials: [
    { img: 'assets/images/testimonials/t1.jpg', thumb: 'assets/images/testimonials/t1-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب يذكر فيها أن الطفل كان متفاعلًا وأن الحصة جمعت بين التعلم واللعب',
      altEn: 'Parent feedback: a WhatsApp chat saying the child was engaged and the lesson combined learning with play' },
    { img: 'assets/images/testimonials/t2.jpg', thumb: 'assets/images/testimonials/t2-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب يثني فيها على المعلمة لأنها تجمع بين الجدية وعدم إشعار الطفل بالملل ليتشجع أكثر',
      altEn: 'Parent feedback: a WhatsApp chat praising the teacher for being firm yet keeping the lesson engaging so the child feels encouraged' },
    { img: 'assets/images/testimonials/t3.jpg', thumb: 'assets/images/testimonials/t3-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب يذكر فيها أن الطفل تفاعل مع المعلمة بشكل جيد رغم خجله',
      altEn: 'Parent feedback: a WhatsApp chat saying the child interacted well with the teacher despite being a little shy' },
    { img: 'assets/images/testimonials/t4.jpg', thumb: 'assets/images/testimonials/t4-640.jpg',
      alt: 'رأي ولي أمر: رسائل واتساب صوتية ونصية يثني فيها على المعلم وأسلوبه ويؤكد رغبته في إكمال الحصص',
      altEn: 'Parent feedback: WhatsApp voice and text messages praising the teacher and his approach and wishing to continue the lessons' },
    { img: 'assets/images/testimonials/t5.jpg', thumb: 'assets/images/testimonials/t5-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب يذكر فيها أن المعلمة تتفاعل مع الأطفال وأن الطفلين استفادا من الحصة',
      altEn: 'Parent feedback: a WhatsApp chat saying the teacher engages well with the children and that they benefited from the lesson' },
    { img: 'assets/images/testimonials/t6.jpg', thumb: 'assets/images/testimonials/t6-640.jpg',
      alt: 'رأي ولي أمر: رسالة صوتية ونص في واتساب يثني فيها على علم المعلمة ويرغب في إكمال الحصص معها',
      altEn: 'Parent feedback: a WhatsApp voice message and text praising the teacher’s knowledge and wishing to continue lessons with her' },
    { img: 'assets/images/testimonials/t7.jpg', thumb: 'assets/images/testimonials/t7-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب تتضمن صورة من الحصة ودعاءً للطفل بأن يجعله الله من أهل القرآن',
      altEn: 'Parent feedback: a WhatsApp chat with a photo from the lesson and a prayer that the child becomes one of the people of the Quran' },
    { img: 'assets/images/testimonials/t8.jpg', thumb: 'assets/images/testimonials/t8-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب يسأل فيها عن الحصة فيجيب الطفل بأنه استمتع بها',
      altEn: 'Parent feedback: a WhatsApp chat in which the parent asks about the lesson and the child answers that he enjoyed it' },
    { img: 'assets/images/testimonials/t9.jpg', thumb: 'assets/images/testimonials/t9-640.jpg',
      alt: 'رأي ولي أمر: رسالة واتساب يشكر فيها المعلم ويذكر أن الطفل استفاد واستمتع بالحصة',
      altEn: 'Parent feedback: a WhatsApp message thanking the teacher and saying the child benefited from and enjoyed the lesson' },
    { img: 'assets/images/testimonials/t10.jpg', thumb: 'assets/images/testimonials/t10-640.jpg',
      alt: 'رأي ولي أمر: محادثة واتساب تذكر أن ابنتها استمتعت كثيرًا بفضل أسلوب المعلمة المميز',
      altEn: 'Parent feedback: a WhatsApp chat saying her daughter enjoyed the lesson very much thanks to the teacher’s distinctive approach' },
    { img: 'assets/images/testimonials/t11.jpg', thumb: 'assets/images/testimonials/t11-640.jpg',
      alt: 'رأي ولي أمر: رسالة واتساب يقول فيها إن الطفل خرج من الحصة فرحًا ووصفها بأنها أحلى حصة في حياته',
      altEn: 'Parent feedback: a WhatsApp message saying the child left the lesson happy and called it the best lesson of his life' }
  ],

  /* صور رحلة أثر: أضف أي عدد من الصور هنا وسيظهر القسم تلقائيًا (القسم الفارغ يبقى مخفيًا).
     كل عنصر: { img, thumb (اختياري), alt, altEn } — صف المحتوى دون ذكر أسماء الطلاب إلا بموافقة ولي الأمر. */
  gallery: {
    assessment: [],  /* تقرير تقييم المستوى */
    plan: [],        /* خطة العمل */
    monthly: [],     /* التقرير الشهري */
    challenges: [],  /* التحديات */
    spotlight: []    /* معلم الشهر وطالب الشهر */
  },

  /* شهادات الطلاب كما كانت في الموقع الأصلي — يلزم تأكيد موافقة أولياء الأمور على نشرها قبل الإطلاق */
  achievements: [
    { img: 'assets/images/achievements/achievement-1.jpg', thumb: 'assets/images/achievements/achievement-1-720.jpg',
      title: 'الطالب عمر', titleEn: 'Student Omar',
      cap: 'أتم حفظ من سورة الناس إلى سورة الروم بتقدير ممتاز — تحت إشراف المعلم أحمد سمير',
      capEn: 'Completed memorizing from Surah An-Nas to Surah Ar-Rum with an excellent grade — supervised by Teacher Ahmed Samir',
      alt: 'شهادة تفوق: الطالب عمر، أتم حفظ من سورة الناس إلى سورة الروم بتقدير ممتاز، تحت إشراف المعلم أحمد سمير',
      altEn: 'Certificate of excellence: student Omar completed memorizing from Surah An-Nas to Surah Ar-Rum with an excellent grade, supervised by Teacher Ahmed Samir' },
    { img: 'assets/images/achievements/achievement-2.jpg', thumb: 'assets/images/achievements/achievement-2-720.jpg',
      title: 'الطالب محمد راذين', titleEn: 'Student Mohamed Radhin',
      cap: 'أتم حفظ سورة البقرة بتقدير ممتاز — تحت إشراف المعلم محمد فاضل',
      capEn: 'Completed memorizing Surah Al-Baqarah with an excellent grade — supervised by Teacher Mohamed Fadel',
      alt: 'شهادة تفوق: الطالب محمد راذين، أتم حفظ سورة البقرة بتقدير ممتاز، تحت إشراف المعلم محمد فاضل',
      altEn: 'Certificate of excellence: student Mohamed Radhin completed memorizing Surah Al-Baqarah with an excellent grade, supervised by Teacher Mohamed Fadel' },
    { img: 'assets/images/achievements/achievement-3.jpg', thumb: 'assets/images/achievements/achievement-3-720.jpg',
      title: 'الطالب محمد', titleEn: 'Student Mohamed',
      cap: 'أتم حفظ جزء عم وجزء تبارك بتقدير ممتاز — تحت إشراف المعلم محمد فاضل',
      capEn: 'Completed memorizing Juz’ Amma and Juz’ Tabarak with an excellent grade — supervised by Teacher Mohamed Fadel',
      alt: 'شهادة تفوق: الطالب محمد، أتم حفظ جزء عم وجزء تبارك بتقدير ممتاز، تحت إشراف المعلم محمد فاضل',
      altEn: 'Certificate of excellence: student Mohamed completed memorizing Juz’ Amma and Juz’ Tabarak with an excellent grade, supervised by Teacher Mohamed Fadel' },
    { img: 'assets/images/achievements/achievement-4.jpg', thumb: 'assets/images/achievements/achievement-4-720.jpg',
      title: 'الطالب أبيان', titleEn: 'Student Abyan',
      cap: 'أتم حفظ القرآن الكريم كاملًا بتقدير ممتاز — تحت إشراف المعلم أحمد سمير',
      capEn: 'Completed memorizing the entire Holy Quran with an excellent grade — supervised by Teacher Ahmed Samir',
      alt: 'شهادة تفوق: الطالب أبيان، أتم حفظ القرآن الكريم كاملًا بتقدير ممتاز، تحت إشراف المعلم أحمد سمير',
      altEn: 'Certificate of excellence: student Abyan completed memorizing the entire Holy Quran with an excellent grade, supervised by Teacher Ahmed Samir' }
  ]
};
