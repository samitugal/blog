---
title: "Sıfırdan AI Native Sistem Tasarlamak"
date: 2026-03-28
draft: false
summary: "Sıfırdan bir sistem kuruyorsak agentları sonradan eklemek yerine, sistemi baştan agentlar için tasarlamanın ne anlama geldiğini ve agent organizasyonunun nasıl kurulması gerektiğini tartışıyorum."
tags: ["ai", "agent", "agentic-system", "architecture"]
categories: ["teknoloji"]
---

![Sıfırdan AI Native Sistem Tasarlamak](/images/ai-native-hero.png)

## Giriş

Bir önceki [blog yazımda](/posts/knowledge-infrastructure.md) mevcut sistemleri agentlarla uyumlu hale getirmenin zorluklarından bahsetmiştim. Mevcut sistemler insan odaklı tasarlanmış, bilgi insanların kafasına gömülmüş ve agentlar bu yapıya sonradan dahil edilmeye çalışılıyordu.

Bu yazıdaysa bu soruyu tersine çevirmek istedim. Hiç bu derde girmek istemiyorsak ne yapmalıyız? Sıfırdan, agentların birlikte çalışacağını bilerek bir sistem tasarlamak nasıl görünür?

Bir akış tasarlayalım, Jira'da madde oluşunca agent'a delege edelim. Agent bu maddeyi alıp işleyip Jira'da update etsin. Bu kadar basit gibi görünüyor ama bu akışı çalıştırabilmek için agent'ın sadece API'ler erişmesi değil aslında sistemi gerçekten anlaması gerekiyor. Sıfırdan kurulacak bu sistemin AI-native olması gerekir ki içerisinde agentlar sistemin herhangi bir noktasında çalışabilsin.

Tabii öncelikle AI Native kavramının ne anlama geldiğini netleştirelim. Ardından bu felsefeyle tasarlanmış bir sistemin codebase düzeyinde nasıl farklılaştığını görelim. Son olarak bu sistemi idame edecek agentların nasıl organize edilmesi gerektiğine bakacağız.

## AI Native Ne Demek?

AI Native kavramının özü aslında oldukça basit bir soruya dayanır:

>"Yapay zeka bu sisteme sonradan mı eklendi, yoksa sistem başından beri yapay zeka ile çalışacak şekilde mi tasarlandı?"

Bir önceki blog yazısında sistemlerin büyük çoğunluğunun **insan odaklı** olarak tasarlandığını anlatmıştım. AI hype dalgasından sonra ise bu sistemlerin üzerine çeşitli entegrasyonlar ekleyerek AI kullanımını mümkün hale getirmeye çalışıyoruz.

Ancak bu yaklaşım çoğu zaman sınırlı kalır. Çünkü sistemin kendisi AI tarafından **okunabilir, anlaşılabilir ve yönetilebilir** olacak şekilde tasarlanmamıştır.

AI Native sistemlerde ise yaklaşım farklıdır. Sistem, bir agent deploy edildiğinde yalnızca belirli API'leri çağırabileceği bir yapı sunmaz. Bunun yerine agentın sistemin genel yapısını, iş alanını ve mevcut operasyonları anlayabileceği bir bilgi altyapısı sunar.

Bu nedenle kod geliştirme, veritabanı tasarımı ve deployment süreçleri belirli standartlar doğrultusunda yürütülmelidir.

Örneğin birçok kurumda kod geliştirme süreçleri **Code Governance** ekipleri tarafından belirlenen standartlara göre yürütülür. Bu kurallar yalnızca insanlar için değil, kod üretecek veya sistemi yönetecek agentlar için de anlamlı olacak şekilde dokümante edilmelidir.

Benzer şekilde agentın çalışacağı iş alanına ait domain bilgisi, veri modelleri ve iş süreçleri de yapılandırılmış şekilde tanımlanmalı ve agentların kullanabileceği hale getirilmelidir.

Mesela kurumsal kaynak planlama (ERP) uygulamalarını düşünelim. Bu tür sistemlerde domain bilgisi oldukça yoğundur ve çoğu zaman yalnızca o sistemi uzun süre kullanan insanlar tarafından anlaşılır.

Örnek vermek gerekirse ERP dünyasında *fatura kesmek* denildiğinde bunun belirli bir anlamı ve süreci vardır. Hangi verilerin oluşturulacağı, hangi kontrollerin yapılacağı, hangi kayıtların güncelleneceği gibi birçok detay bu işlemin doğal bir parçasıdır.

Bir insan kullanıcı bu süreci zamanla öğrenebilir. Ancak bir agentın da aynı işlemi doğru şekilde gerçekleştirebilmesi için bu bilgilerin sistem içerisinde açık ve yapılandırılmış bir şekilde tanımlanmış olması gerekir. Mesela ERP sistemine ait bir wiki sayfası düşünelim. Fatura Kesme işlemi için ne anlama geldiği, hangi tablolara ne yazıldığı, hangi kontrollerin gerektiği burada açıkça tanımlanmış olsun. Agent bu bilgilere erişebildiğinde işlemi doğru şekilde yürütebilir.

### Geleneksel Sistemler vs AI Native Sistemler

Geleneksel yazılım sistemlerinin büyük çoğunluğu insan kullanıcılar düşünülerek tasarlanır. Sistemle etkileşim çoğunlukla kullanıcı arayüzleri üzerinden gerçekleşir ve iş süreçlerinin nasıl çalıştığına dair bilgi çoğu zaman insanların deneyimi içinde saklıdır.

Bu durum insanlar için genellikle bir sorun yaratmaz. Yeni bir çalışan zamanla sistemi kullanmayı öğrenir, iş süreçlerini deneyimleyerek kavrar ve eksik kalan noktaları diğer ekip üyelerine sorarak tamamlar.

Ancak aynı durum bir AI agent için geçerli değildir. Bir agentın sistemi doğru şekilde kullanabilmesi için yalnızca API'lerin var olması yeterli değildir. Sistem hakkında belirli bilgilerin açık, tutarlı ve makine tarafından anlaşılabilir bir biçimde tanımlanmış olması gerekir.

AI Native sistemlerde bu nedenle mimari yaklaşım farklıdır. Sistem yalnızca insan kullanıcıların etkileşime girdiği bir arayüz olarak değil, aynı zamanda agentların çalışabileceği bir operasyon ortamı olarak düşünülür.

Bu yaklaşımda sistem yetenekleri açık şekilde tanımlanmış fonksiyonlar olarak sunulur, domain bilgisi yalnızca insanların deneyimine bırakılmaz ve iş süreçleri mümkün olduğunca makine tarafından takip edilebilir hale getirilir.

Böyle bir mimari sayesinde bir agent yalnızca tek bir API çağrısı yapan pasif bir araç olmaktan çıkar. Bunun yerine sistemi anlayabilen, mevcut yetenekleri keşfedebilen ve belirli iş süreçlerini otonom şekilde yürütebilen bir aktör haline gelir.

![Geleneksel Sistemler vs AI Native Sistemler](/images/traditional-vs-ai-native.png)

Küçük bir düşünce deneyiyle bölümü bitirelim. Çoğu kurumda şu durum yaşanır: sistem yıllarca çalışır, ama onu gerçekten anlayan üç-beş kişi vardır. İşi bilen insanlar ayrıldığında bilgi de sistemden ayrılmış olur. AI Native yaklaşımı bu gizli bilgiyi yakalayıp sistemin kendisine gömmeye çalışır. İnsan hafızasından makine tarafından okunabilir yapıya geçen bilgi, yazılım mimarisinin sessiz ama derin dönüşümü tam da burada başlar.

## AI Native Sistem Tasarımı

### Örnek Senaryo: Agentic ERP Sistemi

Sıfırdan bir ERP sistemi kuruyoruz. İlk aşamayı insanlar yazacak, sonrasını agentlar devralacak. Bakım, hata düzeltme, yeni özellik geliştirme. Bu işlemlerin sorumlulukları zamanla agent'ların sorumluluğuna girecek. Peki bu devir teslimi mümkün kılmak için sistemi baştan nasıl farklı yazmalıyız?

Somutlaştıralım. Jira'da bir madde açıldı: "Fatura modülüne KDV muafiyeti eklenecek." Agent bu maddeyi alır, codebase'e bakar. Ne görür?

Eğer sistemi AI Native tasarlamadıysak muhtemelen şunu görür: fonksiyonlar var, çalışıyor, ama neden böyle yazıldığı belli değil. KDV hesaplaması bir yerde yapılıyor, hangi koşulda muafiyet uygulanacağı yorumsuz, iş kuralı kodun içinde gömülü. Agent değişikliği nereye yapacağını bilemez. Daha kötüsü, yanlış yere yaparsa faturalama bozulur. Fatura bozulursa müşteri hata yapar ve ceza alır. Sonra bizi sorumlu tutar vs. Bu kıyamet senaryosunun sonu gelmez.

Bu senaryo bir AI problemi değil, bir sistem tasarımı problemidir.

### Codebase Bir Arabirimdir

Geleneksel bakışta codebase insan geliştiriciler için yazılır. Yorumlar isteğe bağlıdır, naming convention ekibe göre değişir, iş kuralları bazen kodda bazen wiki'de genelde kıdemli geliştiricinin kafasındadır.

AI Native bir sistem kurmak istiyorsak bu anlayış değişmek zorundadır. Codebase artık yalnızca insanlar için değil, sistemi devralacak agentlar için de bir arabirimdir. Agent'ın bir modülü açtığında yalnızca ne yaptığını değil, neden böyle tasarlandığını da anlayabilmesi gerekir.

Bu pratikte ne anlama gelir? Bir fonksiyonun üstündeki yorum artık "bu ne yapıyor"u değil "neden bu şekilde yapıyor"u açıklamak zorundadır. Bir modülün sınırları rasgele çizilmez, domain sınırlarına göre belirlenir. Mimari kararlar Architecture Decision Record olarak yazılır, yoksa agent aynı kararı yanlış anlayıp tersine çevirebilir. Kıdemli geliştiricinin aklında taşıdığı bilgi "bu servisi doğrudan çağırma, her zaman şu facade üzerinden geç" gibi kod içinde açıkça temsil edilmek zorundadır.

```python
# Kötü örnek: Ne yaptığını anlatıyor, neden böyle olduğunu değil
def calculate_vat(amount: float, is_exempt: bool) -> float:
    """
    Calculates VAT for the given amount.
    params:
        amount: float - The amount to calculate VAT for
        is_exempt: bool - Whether the amount is exempt from VAT
    returns:
        float - The calculated VAT amount
    """
    if is_exempt:
        return 0.0
    return amount * 0.20
```
 
```python
# İyi örnek: Agent değişiklik yapmadan önce ne bilmesi gerektiğini görüyor
def calculate_vat(amount: float, is_exempt: bool) -> float:
    """
    Calculates VAT based on Turkish tax regulation (KDV).
 
    Business rules:
    - Standard VAT rate is 20% (updated from 18% in July 2023, TR legislation).
    - Exemption applies to: exported goods, medical supplies, educational materials.
    - is_exempt flag must be set by the caller; this function does not determine
      eligibility. Exemption logic lives in InvoiceService.resolve_vat_exemption().
 
    WARNING: Do not hardcode the rate elsewhere. If legislation changes,
    update VAT_RATE in config/tax_constants.py — this function reads from there.
    """
    if is_exempt:
        return 0.0
    return amount * VAT_RATE
```

Yukarıda verilen örneklerde, kötü sayılabilecek örnekte agent 0.20 değerini görür ama neden 0.20 olduğunu bilmez. Muafiyeti kim belirliyor, bu değer değişebilir mi, değişirse nerede güncellenmeli. Bunların hiçbirini göremez. KDV muafiyeti eklemek için bu fonksiyona bakar ve yanlış yere dokunur.
İyi örnekte ise agent değişiklik yapmadan önce tüm bağlamı görür: oranın kaynağı, muafiyet mantığının nerede yaşadığı, neye dokunmaması gerektiği.

Tabii kötü örnek dediğime bakmayın, çoğu yerde bu kadar detaylı comment, tüm codebasede bile yoktur.

Bunlar zaten iyi yazılım mühendisliğinin gerektirdiği şeyler. AI Native olmanın farkı şurada: bu kurallar artık opsiyonel değil. Agent affetmez. Bilgi yazılıysa kullanır, yazılı değilse tahmin eder ve tahmin her zaman işe yaramaz.

![Geleneksel Codebase vs AI Native Codebase](/images/traditional-vs-agentic-codebase.png)

### Domain Model

Codebase düzeyindeki temizlik yeterli değil. Agent'ın aynı zamanda sistemin çalıştığı iş alanını anlaması gerekiyor.

ERP örneğine dönelim. Fatura kesmek bir fonksiyon çağrısı değil, bir iş sürecidir. Hangi tablolara ne yazılır, hangi kontroller yapılır, hangi durumlarda işlem reddedilir, KDV muafiyeti hangi koşullarda geçerlidir. Bu soruların tamamı iş kurallarıdır ve büyük çoğunluğu şu an ya birinin kafasında ya da dağınık bir wiki sayfasındadır.

AI Native bir sistemde domain bilgisi yapılandırılmış şekilde temsil edilir. Her iş sürecinin ne anlama geldiği, hangi veri modellerini etkilediği, hangi kısıtlara tabi olduğu açıkça tanımlanır ve agentların erişebileceği hale getirilir. Bu bir wiki sayfası olabilir, kod içindeki yapılandırılmış bir annotation olabilir ya da ayrı bir domain dokümantasyon katmanı olabilir. Biçim önemli değil; önemli olan bu bilginin var olması ve güncel tutulması.

Bu arada küçük bir not ekleyelim. Kod parçacıkları ile ilişkili oldukları dökümantasyonlar bir şekilde birbirine bağlı olmalıdır. Öyle ben kodu yazdım, dökümantasyonu da yazdım hadi bulsun gibi bir beklentiye girmemek gerekir.

```python
@(domain_reference="erpwiki.com/invoice/vat")
def calculate_vat(amount: float, is_vat_exempt: bool = False) -> float:
    """
    Calculates VAT based on Turkish tax regulation (KDV).
 
    Business rules:
    - Standard VAT rate is 20% (updated from 18% in July 2023, TR legislation).
    - Exemption applies to: exported goods, medical supplies, educational materials.
    - is_exempt flag must be set by the caller; this function does not determine
      eligibility. Exemption logic lives in InvoiceService.resolve_vat_exemption().
 
    WARNING: Do not hardcode the rate elsewhere. If legislation changes,
    update VAT_RATE in config/tax_constants.py — this function reads from there.
    """
    if is_vat_exempt:
        return 0.0
    
    return amount * VAT_RATE
```

Bir insan yeni bir geliştirici olarak işe başladığında bu bilgiyi zamanla deneyimleyerek öğrenir. Agent için bu süreç yoktur. Ya bilgi yazılıdır ya da agent onu bilmiyordur.

### Memory ve Context Yönetimi

Agent Jira maddesini alıp codebase'e daldığında karşılaştığı en somut problemlerden biri bağlam yönetimidir. Büyük bir codebase'i tamamen işlemek mümkün değildir. Agent hangi bilgiyi ne zaman yükleyeceğine, hangisini geçici tutup hangisini kalıcı hafızaya atacağına karar vermek zorundadır.

Bu karar sistemi baştan nasıl tasarladığına göre kolaylaşır ya da zorlaşır. Modül sınırları net çizilmişse agent ilgisiz alanları yüklemez. Domain bilgisi erişilebilir bir yapıdaysa agent her seferinde codebase'i baştan taramak yerine doğrudan ihtiyacı olan bilgiye ulaşır. Bağımlılıklar açıkça tanımlanmışsa agent değişikliğin ripple effect'ini önceden hesaplayabilir.

Kötü tasarlanmış bir sistemde ise agent ya çok fazla şeyi hafızasına yükleyerek bağlamını kaybeder ya da kritik bir bilgiden habersiz hatalı bir karar alır. Bu yine bir AI problemi değil, sistemin agent için okunabilir olmamasının bir sonucudur.

## Peki Ya Agentlar?

Bu noktaya kadar sistemi AI Native olarak tasarladık diyelim. Tabii ki konuştuğumuz şeyler küçük dokunuşlar değil, ancak varsayalım ki codebase'imiz agentlar tarafından okunup takip edilebilir, domain bilgisi yapılandırılmış, bağımlılıklar açık. Şimdi diğer bir soruya geliyoruz: bu sistemi idame edecek agentları nasıl organize etmeliyiz?

### Neden Tek Agent Yetmez?

Jira'dan gelen maddeye dönelim: "Fatura modülüne KDV muafiyeti eklenecek." Tek bir agent bu işi üstlenirse ne yapması gerekir? Önce maddeyi analiz edecek, sonra codebase'de ilgili modülleri bulacak, etkilenen alanları tespit edecek, domain kurallarını kontrol edecek, değişikliği yazacak, test edecek ve sonucu raporlayacak.

Bu adımların her biri farklı bir bağlam gerektirir. Codebase analizi yaparken agent fatura modülünün bağımlılıklarını hafızasında tutmak zorundadır. Kod yazarken test stratejisini düşünmek zorundadır. Domain kurallarını kontrol ederken iş sürecinin tamamını görmek zorundadır. Tüm bunları sırayla tek bir agent üstlenirse bağlamı şişer, yavaşlar ve bir noktada kritik bir bilgiyi kaybeder.

İnsan takımları neden böyle çalışmaz? Çünkü işi bölerler. Biri analiz eder, biri yazar, biri review eder. Uzmanlık alanları farklıdır ve paralel çalışırlar. Aynı mantık agentlar için de geçerlidir ve bence bu yaklaşım en mantıklı olanıdır.

### Orchestrator Pattern

Orchestrator pattern'de merkezi bir koordinatör agent vardır. Bu agent görevi alır, ne yapılması gerektiğini analiz eder ve işi uzman agentlara dağıtır. Her uzman agent kendi alanında çalışır: biri codebase'i inceler, biri domain kurallarını kontrol eder, biri kodu yazar, biri test sürecini yürütür. Koordinatör bu çıktıları toplar, birleştirir ve sonucu raporlar.

Bu mimarinin en güçlü yanı kontroldür. Her adım izlenebilir, her kararın kaynağı bilinir. Bir şey yanlış giderse hangi agent hangi bilgiyle ne kararı aldı geriye dönük görmek mümkündür. ERP gibi kritik iş süreçlerinin çalıştığı sistemlerde bu izlenebilirlik çok önemlidir. Hatalı bir fatura kaydı kimin hangi kararının sonucunda oluştu, bunu bilmek istersiniz.

Bu noktada kendi tercihimi paylaşayım. Yazılım geliştirme süreçleri üç aşağı beş yukarı bellidir. Jira maddesi açılır, biri üstüne alır, geliştirir, teste gönderir, test başarısız olursa geliştirmeye döner, başarılı olursa üretime çıkar. Tüm süreci tek bir koordinatör agent yönetmesindense her aşamanın kendi workflow'u ve kendi agentları olsun derim. State machine gibi. Her workflow bir state, her geçiş bir kural.

### Mesh Pattern

Mesh pattern'de koordinatör yoktur. Agentlar birbirleriyle doğrudan iletişim kurarak çalışır. Codebase analisti kodu yazana bağlamı iletir, kod yazan testi yürütene ne test edeceğini söyler. Merkezi bir otorite olmadan iş akar.

Bu yaklaşım daha esnek ve daha ölçeklenebilirdir. Koordinatör darboğazı ortadan kalkar, agentlar paralel çalışabilir. Ancak bu esnekliğin bir bedeli vardır: sistemin ne yaptığını takip etmek zorlaşır. Bir şey yanlış gittiğinde sorumluluk dağılmıştır ve hatanın kaynağını bulmak güçtür.

![Orchestrator vs Mesh Pattern](/images/orchestrator-mesh.png)

### Hangisini Seçmeli?

Her iki mimarinin de geçerli kullanım alanları vardır. Ama ERP gibi kritik iş süreçlerini yürüten bir sistem için  bana göre Orchestrator pattern daha doğru seçimdir.

Neden? Çünkü bu sistemlerde hata toleransı düşüktür. Yanlış yazılan bir fatura, hatalı uygulanan bir muafiyet kuralı ya da beklenmedik bir bağımlılık değişikliği ciddi sonuçlar doğurabilir. Orchestrator pattern bu riski merkezi kontrol ve izlenebilirlik ile yönetir. Mesh'in esnekliği ise bu kontrol ihtiyacını karşılamaz.

Tabii bu bir tercih, evrensel bir kural değil. Az önce workflowları da tercih edeceğimi belirttim. Daha az kritik, daha çok keşif gerektiren sistemlerde Mesh pattern son derece verimli olabilir. Ama hangi mimariyi seçerseniz seçin, altındaki sistem AI Native tasarlanmamışsa agentların koordinasyonu ne kadar iyi olursa olsun bağlam eksikliğini kapatamaz.

## Sonuç ve Çıkarımlar

Bu yazıda iki soruyu yanıtlamaya çalıştık. Birincisi: agentların çalışacağı bir sistemi sıfırdan tasarlarken ne farklı yapmalıyız? İkincisi: bu sistemi idame edecek agentları nasıl organize etmeliyiz?

İki sorunun cevabı birbirinden bağımsız değil. Sistemi AI Native tasarlamadan agent mimarisini ne kadar iyi kurarsanız kurun, agentlar kör uçuş yapar. Agent organizasyonunu ne kadar iyi düşünürseniz düşünün, altındaki sistem okunabilir değilse agentlar hata yapar.

Bir önceki yazıda mevcut sistemleri agentlarla uyumlu hale getirmenin zorluğundan bahsetmiştim. Bu yazı o sorunun yanıtı: sıfırdan kuruyorsanız bu zorluğu baştan bertaraf edebilirsiniz. Ama bunun için AI'ı bir özellik olarak değil, sistemin tasarım ilkesi olarak ele almanız gerekir.

Sonuçta bu bir yapay zeka meselesi değil. Codebase'i okunabilir yazmak, domain bilgisini yapılandırmak, agentları doğru organize etmek. Bunların hepsi zaten iyi yazılım mühendisliğinin gerektirdiği şeyler. AI Native olmak bu prensipleri opsiyonellikten zorunluluğa taşımaktan ibarettir.