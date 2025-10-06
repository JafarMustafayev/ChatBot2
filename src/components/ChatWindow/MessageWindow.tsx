import MessageBubble from "./MessageBubble";

const MessageWindow = () => {
  const messages = [
    {
      role: "ai",
      text: "Salam, xoş gəlmisiniz! Mən sizin virtual köməkçinizəm.",
    },
    { role: "ai", text: "Bugün sizə necə kömək edə bilərəm?" },
    {
      role: "user",
      text: "Salam. Mən məhsul axtarıram, amma hansı kateqoriyadan başlamağımı bilmirəm.",
    },
    {
      role: "ai",
      text: "Narahat olmayın, birlikdə tapa bilərik. Marağınız daha çox elektronika, geyim, yoxsa ev əşyaları üzərindədir?",
    },
    { role: "user", text: "Elektronika." },
    { role: "user", text: "Dəqiq desəm, yeni bir noutbuk almaq istəyirəm." },
    {
      role: "ai",
      text: "Əla seçimdir! Bəs hansı məqsədlə istifadə edəcəksiniz? Məsələn, proqramlaşdırma, dizayn, oyun və ya sadəcə gündəlik istifadə?",
    },
    { role: "user", text: "Proqramlaşdırma və bəzən dizayn işləri üçün." },
    {
      role: "ai",
      text: "O zaman güclü prosessor, kifayət qədər RAM və keyfiyyətli ekran çox vacibdir. Məsələn, Intel i7 və ya Ryzen 7 prosessorlu modellərə baxa bilərik.",
    },
    {
      role: "ai",
      text: "Eyni zamanda SSD yaddaşın ən azı 512GB olmağı tövsiyə olunur, çünki bu həm proqramların yüklənmə sürətini, həm də ümumi performansı ciddi dərəcədə artırır.",
    },
    {
      role: "user",
      text: "Bəs qiymət aralığı necə dəyişir bu parametrlərdə? Mənim büdcəm maksimum 1800 AZN civarındadır.",
    },
    {
      role: "ai",
      text: "Bu büdcə daxilində çox yaxşı variantlar tapmaq mümkündür. Məsələn, ASUS, Lenovo və Acer modelləri 16GB RAM və i5/i7 prosessorla bu aralıqda olur.",
    },
    {
      role: "ai",
      text: "İstəyirsinizsə, sizə 3 fərqli model təklif edim — biri balanslı, biri daha performans yönümlü, biri isə daha yüngül ofis istifadəsi üçün.",
    },
    { role: "user", text: "Bəli, çox yaxşı olardı." },
    {
      role: "ai",
      text: "Birinci: **ASUS ZenBook 14**, 16GB RAM, i7-1360P, 512GB SSD. Yüngül, uzun batareya ömrü var. Qiyməti təxminən 1750 AZN-dir.",
    },
    {
      role: "ai",
      text: "İkinci: **Lenovo IdeaPad Gaming 3**, Ryzen 7 7735HS, RTX 3050, 16GB RAM. Daha çox performans üçün uyğundur. Qiyməti 1850 AZN civarındadır.",
    },
    {
      role: "ai",
      text: "Üçüncü: **HP Pavilion 15**, i5-1335U, 16GB RAM, 512GB SSD. Sadə ofis və proqramlaşdırma üçün idealdır. Qiyməti 1500 AZN-dir.",
    },
    {
      role: "user",
      text: "Maraqlıdır, bəs bu modellərin hər biri üçün RAM artırmaq mümkündürmü?",
    },
    {
      role: "ai",
      text: "Bəli, amma modellərdən asılıdır. ASUS ZenBook-da RAM lövhəyə lehimlidir, artırmaq olmur. Lenovo və HP modellərində isə bir yuva boş qalır, əlavə edə bilərsiniz.",
    },
    {
      role: "user",
      text: "Mükəmməl. Məncə Lenovo daha uyğundur, çünki bəzən render işləri də görürəm.",
    },
    {
      role: "ai",
      text: "Razıyam, o halda Lenovo IdeaPad Gaming 3 sizin üçün ən balanslı seçimdir. Həm performans, həm də genişlənmə baxımından əlverişlidir.",
    },
    {
      role: "ai",
      text: "İstəyirsinizsə, mən sizə bu modelin texniki spesifikasiyasını və ən yaxın mağazalardakı stok vəziyyətini göstərə bilərəm.",
    },
    { role: "user", text: "Bəli, baxmaq istəyirəm." },
    {
      role: "ai",
      text: "Lenovo IdeaPad Gaming 3 – Ryzen 7 7735HS / 16GB RAM / RTX 3050 / 512GB SSD. Hal-hazırda Baku Electronics və Kontakt Home-da stokdadır.",
    },
    {
      role: "ai",
      text: "Qeyd: bəzi mağazalarda RAM 8GB variantı daha ucuzdur, amma sonradan artırmaq mümkündür.",
    },
    {
      role: "user",
      text: "Super. Çox sağ ol! Bu arada dizayn interfeysim üçün belə real mesajları test etmək istəyirdim, bu data çox işimə yarayacaq.",
    },
    { role: "ai", text: "Məmnuniyyətlə! Layihənizdə uğurlar arzulayıram. 😊" },
  ];

  return (
    <div className="flex flex-col gap-3 p-4min-h-screen">
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
};

export default MessageWindow;
