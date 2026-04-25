---
title: "Agentlarda Memory Kullanımı & Türleri"
date: 2025-06-19
lastmod: 2025-06-19
draft: false
description: "AI agent mimarilerinde hafıza yapıları: sensory, short-term, long-term ve semantic memory türleri. LLM tabanlı sistemlerde context yönetimi."
summary: "Bu yazıda agent mimarilerinde hafıza (memory) yapılarının neden kritik olduğunu ele alıyor; sensory'den semantic'e kadar farklı memory türlerini detaylandırıyor ve bunların uygulamadaki yerini örneklerle açıklıyorum."
slug: "agent-memory-kullanimi"
keywords: ["agent memory", "LLM", "yapay zeka", "semantic memory", "context window", "RAG", "hafıza yönetimi"]
tags: ["generative ai", "memory", "agents"]
categories: ["tech"]
author: "Sami Tuğal"
---

## Memory Neden Önemlidir

LLM’ler, sanılanın aksine herhangi bir "state" tutmazlar.  Yani her sorgu — ne kadar sohbet havasında olursa olsun — model için bağımsız bir çağrıdır.  Arka planda bir bağ yoktur; her mesaj "tek başına", "bağlamsız" gider.

Eğer iki mesaj arasında ilişki kurmak istiyorsanız, bu ilişkiyi sizin kurmanız gerekir.  Yani geçmiş konuşmaları, eklediğiniz belgeleri, kod parçalarını her defasında modele tekrar göndermek zorundasınız. Bunu öğrendikten sonra, belki bir aydır açık duran ChatGPT oturumunuzu kapatmanın zamanı gelmiştir 😄  Çünkü aslında hafıza diye bir şey yok — sadece sürekli baştan anlatıyorsunuz.

İşte bu yüzden **memory**, LLM tabanlı agent mimarilerinde kritik bir rol oynar. Kullanıcıya devam eden bir sohbet hissi veren şey aslında bu “hafıza simülasyonu”dur.  Her seferinde tek cevap veren, geçmişle bağı olmayan yanıtlar zamanla anlamsızlaşır.

Ama bu işin bir sınırı da var:  Konuşma çok uzarsa, gereksiz yere token maliyeti artar.  Ya da prompt’a eklenen içerik fazla olursa, model dikkatini kaybedip sorunun dışına çıkar.
Tüm bu nedenlerle memory yönetimi, hem işlevsel hem ekonomik hem de deneyimsel olarak önemli bir konudur.

---

## Agentlarda Memory Nasıl Çalışır?

Bir önceki kısımda da bahsettiğimiz simüle edilmiş **memory** yapısını bu kısımda biraz daha açalım.

Aslında agent'lar geçmişi “gerçekten hatırlamaz.” Bunun yerine, geçmişi tekrar tekrar onlara **hatırlatmamız gerekir**.  Bu da genelde ya context içine geçmiş mesajları koymakla ya da dış bir veri kaynağından (örneğin bir vektör veri tabanı) geri getirip modele enjekte etmekle yapılır.

Bir agent, şu 3 bellek mekanizması üzerinden çalışabilir:
- **Kısa süreli hafıza (short-term):** Context window içine koyduğumuz önceki mesajlar, son tool çağrısı vs.
- **Uzun süreli hafıza (long-term):** Vektör tabanlı arama ile daha önceki konuşmalardan veya dokümanlardan alınan içeriklerin geri getirilmesi.
- **Çalışma belleği (working memory):** Mevcut görev için geçici olarak tutulan bilgiler. Örn. önceki adımda aldığı tool çıktısı.

Biraz sonra bunlardan detaylı bahsedeceğiz. Şimdilik şunu söyleyeyim hepsi bayağı önemli.

Agent framework’leri (LangChain, Semantic Kernel, ReAct agent'ları, AutoGPT gibi) bu üçlü yapıyı genelde farklı şekillerde uygular:  
- Bazısı tüm geçmişi context’e koyar (bu pahalıdır),  
- Bazısı vektör arama yapar ve sadece alakalı cümleleri getirir,  
- Bazısı oturumların sonunda tüm oturumun verisiyle bir çıkarsama yapar, bu veriyi depolar ve daha sonra kullanır. (isim, yaşadığın yer, çalıştığın proje gibi)
- Kimisi de tool planlaması için özel bir memory yapısı kullanır (scratchpad, tool buffer gibi).

Kısacası bir agent’ın memory kullanımı, aslında **hangi bilgiyi, ne zaman ve nasıl geri çağıracağına** dair stratejiler bütünüdür.

Ve iyi bir memory stratejisi olmadan, agent sadece tek kullanımlık bir komut çalıştırıcısından öteye geçemez.

## Memory Türleri

---

### Sensory Memory

Burası agent mimarisindeki en kısa ömürlü hafıza türü. İnsan beyninde bu, saniyelik görsel ve işitsel verileri barındıran geçici bir katmandır. Agent’lar için de benzer şekilde: sistemin "ilk algıladığı şey" buraya düşer.

Örnek mi?  
Kullanıcının ilk mesajı, ekrana düşen bir görsel, mikrofonla gönderilen bir ses…  Yani agent’ın dış dünyayla ilk teması burada başlar.

Bu hafıza çok kısa yaşar. Genelde sadece bir adımlık işlemde kullanılır ve sonra kaybolur. Ama dikkat: Bazı framework’lerde burası doğrudan başka memory katmanlarına da aktarılır.  
Örneğin:  
- Görsel input alınır → caption model ile açıklama üretilir → context’e yazılır.  
- Ses alınır → ASR (speech-to-text) ile metne çevrilir → embedding’e gider.

Yani sensory memory çoğu zaman sadece bir “geçiş noktası”dır. İnsansı bir memory yapısı kurulmak isteniyorsa **olmazsa olmazdır**.

> Peki insansı bir hafıza için başka neler gerekir?” diye merak edenleri [şöyle alabiliriz.](https://www.linkedin.com/pulse/building-human-like-memory-your-ai-agents-stanley-russel-50lwc/)

---

#### Visual Buffer
Bu katman, agent’ın kısa süreli “görsel belleği” gibi düşünebilirsin. İnsan beyninde bir nesneye kısa süre bakıp sonra başka yöne çevirdiğimizde, o görüntünün birkaç saniye daha zihnimizde asılı kalmasını sağlar. İşte Visual Buffer da tam bu işi yapar — görülen ama henüz unutulmayan şeyleri tutar.

LLM destekli agent’larda bu yapı özellikle multimodal sistemlerde ortaya çıkar:

Bir görsel upload edilir **→** Görsel bir caption modelinden geçer (örneğin "bir kedi pencereden bakıyor 😺") **→** Bu bilgi kısa süreli olarak context’e eklenir ya da geçici olarak saklanır.

Önemli olan şu: Bu katmanda tutulan içerik genelde sadece birkaç adım boyunca kullanılır. Ama o birkaç adımda çok işe yarar:
Mesela kullanıcı "kedi ne yapıyor?" diye sorduğunda, context’e caption düşmüşse model hemen yanıtlayabilir.

Ama bu buffer temizlenirse? O zaman **"Ne kedisi, sen kime kedi diyorsun?"** diye şaşıran bir modelle karşılaşabiliriz 😅 Visual Buffer, sensory memory'den farklı olarak genellikle işlenmiş veriyi tutar. Yani "görüntünün kendisi" değil, onun anlamı burada saklanır.

---

#### Audio Buffer
Gelelim sesi hatırlamaya. İnsan beyninde duyduğumuz şeyler bir süre kulağımızda çınlamaya devam eder ya, işte agent mimarisindeki Audio Buffer da tam olarak bu işi yapar.

Bu katman, sisteme gelen sesli girdilerin kısa süreli olarak işlenmiş hâlini tutar. Ama dikkat, burada sesi saklamıyoruz — sesten elde edilen anlamı saklıyoruz.

Mesela kullanıcı mikrofonla "bugünkü toplantı saat kaçtaydı?" dedi:
Ses alındı **→** ASR (Automatic Speech Recognition) ile yazıya çevrildi **→** Metin context'e eklendi

Bu yapı sayesinde, agent birkaç adım sonra hâlâ "bugünkü toplantı" bilgisini hatırlayabilir. 

Bu yapı genelde:

* Sesli asistanlarda,
* Multimodal agent mimarilerinde,
* Realtime toplantı takibi yapan sistemlerde kullanılır.

Visual Buffer’dan farkı ne derseniz:
Burada ham görüntü değil, ses; ve görüntü açıklaması yerine transkript tutulur. Ama yine ortak noktaları şu:
Her ikisi de kısa ömürlüdür, birkaç adım sonra unutulurlar… eğer bir yere transfer edilmezlerse.

---

### Short Term Memory

Evet geldik insansı hafızanın bir sonraki adımına. Kısa dönemli hafızamız.

Bu katman, agent’ın “şimdi ne oluyor?” sorusuna cevap verebilmesini sağlar. Birkaç adım önce yapılan konuşmalar, alınan kararlar, çağrılan fonksiyonlar… bunların hepsi burada geçici olarak tutulur.

Ama buradaki veriler uzun süre kalmaz. Genelde sadece mevcut görev boyunca yaşar — yani birkaç adım, belki birkaç mesaj.
Ve sonra silinir.

Peki ya bu hafıza katmanında sorun çıkarsa ne olur?

Herhalde Kayıp Balık Nemo’daki Dory’i hatırlarsınız. İşte agent bu katmanı iyi yönetemezse aynen öyle davranır 😅
Bu yüzden Short Term Memory genelde context window içinde tutulur:
Son 3–5 mesaj, yapılan son tool çağrısı, gelen yanıtlar gibi bilgiler modele context olarak gönderilir.

---

#### Context Window

Agent sistemlerinin kısa dönemli hafızası dedik ama bu hafıza nerede tutuluyor dersen, işte cevabı: Context Window.

LLM’lerin aslında bir “hafızası” yok dedik ya — her mesajı baştan göndermek zorundayız. İşte bu gönderdiğimiz tüm bilgiler context window denen sınırlı bir alanda tutuluyor.
Yani modelin "bak buraya kadar olan konuşmalar" diye gördüğü tek yer burası.

Genellikle içerisine; kullanıcının şu ana kadarki mesajları, agent'in verdiği yanıtlar, sahip olunan toolların bilgileri, tool çağrıları ve dönen sonuçlar, sistem promptu gibi tanımlar bulunur. 

Ama bu pencere sınırsız değil. Modelin türüne göre değişiyor.
Mesela GPT-4’te bu alan 128K token ile sınırlı. Gemini tarafında ise bu limit 1M token — Google biraz abartmış gibi görünüyor 😄

Peki bu pencere taşarsa ne olur?
Model bağlamı kaybetmeye başlar. “Bu soruyu neden sordu?”, “Kiminle konuşuyordum?” gibi kafa karışıklıkları başlayabilir.
Bu yüzden taşmayı önlemek için şu yollar izlenir:

* Eskiyen sohbetleri özetlemek, sadece içlerindeki önemli bilgileri kullanmak
* Gereksiz satırları silmek
* Sohbeti belirli sayıda geçmiş sohbet bilgisi ile devam ettirmek

> Context window, aslında agent’ın “şu anki farkındalığı”dır. Ne kadar netse, yanıtlar da o kadar sağlam olur.

---

#### Working Memory

İnsanda “şimdi ne yapıyordum ben ya?” diye bir an vardır ya… İşte agent'lar da bazen bunu yaşar 😄 Ama bunu minimuma indirmek için çalışma belleği dediğimiz katman devreye girer: Working Memory.

Bu yapı, agent’ın şu anda aktif olarak uğraştığı görevle ilgili bilgileri geçici olarak tuttuğu yerdir. Kalıcı değildir ama çok kritiktir.

Örnek olarak:
* Kullanıcı bir döngü başlatır ve her adımda farklı bir tool çağrısı yapılması gerekir.
* Agent bir tablo oluşturur ve sonraki adımda bu tabloya veri eklemesi beklenir.
* Ya da bir plan oluşturur ve bu planın hangi adımındayız sorusuna cevap vermesi gerekir.

İşte bu gibi görevlerde çalışma belleği, önceki adımdaki çıktıyı, geçici değişkenleri veya planın şu anki adımını içeride tutar.

Bazı framework'lerde bu belleğe **scratchpad**, **tool buffer**, **intermediate steps** gibi adlar verilir. Adı ne olursa olsun, görev sırasında “şu an ne yapıyoruz?” sorusunun cevabını içinde taşır.

---

#### Tool Invocation Buffer

Bazen bir agent'ın sadece ne düşündüğü değil, ne yaptığı da önemlidir. İşte bu noktada devreye giren yapı: Tool Invocation Buffer.

Bu katman, agent’ın çağırdığı araçlara (tool) dair geçmiş eylemleri geçici olarak saklar.
Yani hangi tool çağrılmıştı, hangi parametrelerle çağrıldı, nasıl bir çıktı döndü gibi bilgiler burada tutulur.

Düşün bir ajan 3 adım önce “get_customer_data” tool’unu çağırdı. Sonraki adımda bu dataya göre rapor oluşturması bekleniyor.
Ama tool çağrısını ve çıktısını unutursa? E başa dönmek gerekir 😅

Tool Invocation Buffer tam da bu yüzden vardır. Genellikle:
* En son çağrılan tool’un adı,
* Girdi parametreleri,
* Dönen sonuçlar gibi detaylar bu bellekte geçici olarak saklanır.

---

### Long Term Memory

Evet, sonunda geldik işin derinlerine: Uzun dönemli hafıza.
Kimi framework’ler buraya “vector memory” der, kimisi sadece “knowledge base” olarak adlandırır. Ama özünde yaptığı şey çok net:

“Geçmişte olan önemli şeyleri unutma, sonra lazım olabilir.”

Bu katman, agent’ın daha önceki oturumlardan, sohbetlerden ya da belgelerden öğrendiği bilgileri kalıcı bir şekilde sakladığı yerdir.
Buraya yazılanlar hemen unutulmaz, bir veritabanında tutulur. 

Ben bu yapıyı genellikle bir tool aracılığıyla kullanıyorum. Her bilgiyi anında context’e gömmek yerine, gerektiğinde modelin bu hafızaya erişip kullanıcıya dair özel verileri geri çağırmasını sağlıyorum.

Bazen bu bilgiler doğrudan sistem promptuna da inject edilir — örneğin daha kişisel bir deneyim için:

```plaintext
Sistem Promptu: Kullanıcının ismi Ali, en son ExampleProject üzerinde çalışıyordu.

Human: Selam  
Agent: Selam Ali, nasılsın? Bugün de ExampleProject üzerinde devam mı edeceğiz?
```

Bazı dikkat edilmesi gereken hususlar şunlardır;
* Gereksiz her şeyi uzun hafızaya atarsan modelin odağı kayar.
* Fazla detay verirsen token sınırını boş yere yersin.
* Özetlenmiş, gerçekten anlamlı olan embedding’lerle çalışmalısın.

> Long Term Memory = Agent'ın kişiliği + deneyimi + sabrı gibi düşünebilirsin.

---

#### Semantic Memory

Agent sistemlerinde en "bilge" görünen bellek tipi burasıdır.
Çünkü sadece bir şeyi hatırlamaz, onu anlamlandırır da.

“Kullanıcı geçen hafta ‘stokları analiz et’ dedi. Bu, finansal analiz tool’unu çağırmak anlamına gelir.”
İşte bunu yapan, semantic memory’dir.

Peki nasıl çalışır?

Aslında arka planda olan şu:
Geçmişteki etkileşimler (sohbetler, tool çıktıları, belgeler) vektörel temsillere dönüştürülür. Bu temsiller “anlam”a göre gruplanır. Kullanıcı yeni bir şey sorduğunda, model o embedding’lere bakar ve:
“Bu daha önce benzer bir şeydi” der, oradan hafızayı geri çağırır.

Ve işin güzel kısmı:
Bu çağrılar kelime eşleşmesine değil, anlamsal yakınlığa dayanır.
Yani sen “bugünkü satışlar” desen bile, sistem “dünkü raporla bağlantılı olabilir” diye düşünebilir.

Bir çeşit RAG işlemi denilebilir.

---

#### Episodic Memory

Burası agent’ın “anı defteri” gibi düşünebilirsin.  
Yani agent’ın **geçmişte yaşadığı deneyimleri** bölümler hâlinde hatırlamasını sağlar.

> “Geçen hafta kullanıcı önce `stok listele` dedi, sonra `PDF'e dönüştür` dedi. Bu sırada PDF tool’unda bir hata oldu. Sonra kullanıcı başka bir şeye geçti.”  
İşte bu olaylar zinciri, tek tek değil; **bir bağlam içinde** saklanır.

Kullanıcıyla yapılan her etkileşimi tek tek saklamak yerine, **bölümler hâlinde** (episode olarak) hafızaya almak, daha anlamlı çıkarımlar yapılmasını sağlar.  
Mesela:
- Bir kullanıcının alışkanlıklarını analiz etmek,
- Hatalı senaryoları daha sonra debug edebilmek,
- Uzun vadeli görevlerde “nerede kalmıştık” sorusunu çözebilmek için kullanılır.

Episodic memory genellikle şu şekilde tutulur:

- Her oturum sonunda bir özet çıkarılır:  
  → “Bu görüşmede kullanıcı stoklarla ilgili 3 tool kullandı, PDF oluşturdu ve çıktı istedi.”  
- Bu özetler zaman damgası, görev tipi, kullanılan tool’lar gibi etiketlerle birlikte saklanır.
- Yeni bir konuşma başladığında, geçmişte benzer “bölümler” varsa çağrılır.

Bazı sistemler bunu SQL gibi ilişkisel veri tabanlarında yapar, bazıları JSON tabanlı timeline’lar kullanır. Daha gelişmiş olanlar ise embedding’lerle “olay kümelerini” saklar.

Episodic memory olmasa, agent her yeni konuşmada sıfırdan başlar.  
Ama bu hafızayla:

> “Geçen ay bana ‘döviz kurları’ demiştin, şimdi yine benzer bir konu açtın, muhtemelen devam etmek istiyorsun.”  
diyen bir yapı oluşturmak mümkün.

Yani:
- Semantic memory "neyle ilgiliydi?" sorusuna yanıt verir.  
- **Episodic memory** ise "ne oldu, nasıl gelişti?" kısmını çözer.

> Kısaca:  
> **Episodic memory = Agent’ın yaşanmışlıklarıdır.**

---

#### Structured Memory

Structured Memory, adından da anlaşılacağı gibi **önceden belirlenmiş, düzenli bir veri yapısı** ile çalışan hafıza türüdür. Diğer memory katmanları genelde "ne varsa onu hatırla" mantığıyla çalışırken, structured memory belirli bir şablona göre bilgileri saklar ve çağırır.

Mesela bir agent’ın bir kullanıcı hakkında şu bilgileri hep tutması gerekiyorsa:
- Kullanıcı adı
- Şirketi
- Son görüştüğü tarih
- Aktif projesi
- Tercih ettiği çıktı türü

Bunları bir `User` objesinde düzenli olarak tutmak structured memory olur.  
Yani bu memory katmanı aslında:
```json
{
  "user_id": "123",
  "name": "Ali",
  "company": "Logo Yazılım",
  "last_seen": "2025-06-10",
  "active_project": "Phoenix",
  "preferred_format": "Excel"
}
```

Structured memory özellikle:

Kişisel asistan tarzı agent'larda,

Oturumlar arası geçiş gereken uygulamalarda,

Rol tabanlı erişim gibi sabit bilgilerin tutulduğu yapılarda kullanılır. Hızlı erişilebilir ve doğruluğu yüksektir. Prompt yükünü de oldukça azaltır.

---

## Sonuç

Agent mimarisi, sadece birkaç fonksiyonu çağıran akıllı bir bot değil; hafızası, geçmişi, dikkati ve karar mekanizması olan bir sistemdir. Bu yazıda memory türlerini adım adım inceledik:  

- Sensory memory ile başlayan,
- Visual/audio buffer gibi kısa süreli algı noktalarıyla devam eden,
- Context window ve working memory gibi geçici ama kritik katmanları kapsayan,
- Long-term, semantic, episodic ve structured memory gibi kalıcı yapılarla güçlenen bir zihin haritası oluşturduk.

Gördüğümüz şey şu:  
> **Gerçek bir agent, yalnızca güçlü bir model değil — iyi kurgulanmış bir hafıza mimarisidir.**

Çünkü hafıza olmadan anlam kurmak zor, devamlılık imkânsız, kişiselleştirme ise hayal olur.

Bu yazının amacı hem konseptleri sade bir dille anlatmak, hem de gerçekten çalışan örneklerle arka planı görünür kılmaktı. Umarım başarılı olmuştur.

Yorumlarınızı, katkılarınızı ve kendi deneyimlerinizi her zaman beklerim.  
Bir sonraki yazıda görüşmek üzere

---