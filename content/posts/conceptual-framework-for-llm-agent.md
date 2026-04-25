---
title: "LLM tabanlı Agent Sistemleri için Kavramsal Çerçeve"
date: 2026-01-11
lastmod: 2026-01-11
draft: false
description: "LLM tabanlı agent sistemlerinin temel bileşenleri: memory, tools, sessions ve mesajlar. Framework bağımsız kavramsal mimari rehberi."
summary: "LLM tabanlı agent sistemlerinin temel bileşenlerini ve aralarındaki ilişkileri framework bağımsız bir bakışla ele alan kavramsal çerçeveyi oluşturmaya çalışıyorum."
slug: "llm-agent-kavramsal-cerceve"
keywords: ["LLM agent", "agent framework", "yapay zeka", "memory", "tools", "AI architecture", "langchain"]
tags: ["llm", "agent", "agent-framework"]
categories: ["ai"]
author: "Sami Tuğal"
---

## 1. Giriş
İşim gereği uzun süredir LLM tabanlı AI Agent’lar üzerine çalışıyorum. Hatta birkaç kez sıfırdan agent framework yazdım, zaman zaman da açık kaynak agent framework’lerin kaynak kodlarını kurcalayıp debug’ladım. Yeni bir özellik mi gelmiş, mimaride ne değişmiş, sektörden geri kalmayayım diye bakıyorum.

Bu süreçte fark ettiğim şey şu oldu: İsimler, API’ler ve soyutlamalar değişse de, neredeyse tüm agent framework’ler aynı temel bileşenlerden oluşuyor.

Konuşma geçmişini tutan bir memory katmanı var. Farklı tipleri, stratejileri ve kullanım biçimleri olabilir ama yaptığı iş aynı. Bir LLM var. Bu LLM’e “süper güçler” kazandıran bir dizi tool var. Kullanıcının başlattığı bir session, bu session içinde akan mesajlar ve üretilen çıktılar var.

Son üç yılda inanılmaz bir hızla gelişen agent ekosistemi, farkında olmadan belirli bir ortak yapıya ulaşmış gibi görünüyor. Elbette bu durumun önümüzdeki birkaç ay içinde değişmeyeceğinin garantisi yok. Bu alan zaten sürprizlerle dolu.

Ancak dikkatimi çeken bir başka nokta da şu oldu: Okuduğum makalelerin ve çalışmaların büyük bir kısmı, bu bileşenlerin nasıl daha verimli çalıştırılabileceğine odaklanıyor. Memory nasıl optimize edilir, tool çağrıları nasıl iyileştirilir, orchestration daha akıllı nasıl yapılır gibi sorulara cevap arıyorlar.

Buna karşılık, bu bileşenleri bir araya getirip “bir agent’ı agent yapan şey nedir?” sorusuna üst seviyede cevap veren, bileşenler arası ilişkileri net biçimde ortaya koyan bir çalışma pek göremedim.

Daha önce paylaştığım Metadata Yönetimi ve MOF Kavramı yazısında, dünyadaki şeylerin (things) birer varlık olarak ele alınabildiğini ve ortak özellikler üzerinden daha üst seviye kontratlara ulaşılabileceğini anlatmıştım. Aynı bakış açısını, neden LLM tabanlı agent’lar için de uygulamayalım diye düşündüm.

## 2. Agent’ı Tek Bir Şey Gibi Düşünme Hatası
Yaygın inanışın aksine, LLM’ler doğrudan “süper güçlerle” gelmez. Bir LLM, en temel haliyle, devasa bir autocomplete mekanizmasından ibarettir. Bir LLM’i autocomplete yapan şeyle, bir agent yapan şey aynı değildir. Bir LLM’i agent’a dönüştürmek için tek bir adım değil, birden fazla katmandan geçmek gerekir. 

En basit örnekle başlayalım: LLM’ler stateless çalışır. Yani attığınız ilk istekle ikinci istek arasında doğal bir bağ yoktur. Her çağrıda model sıfırdan çalışır ve önceki bağlamı “hatırlamaz”. Bu yüzden LLM’e bir memory bileşeni eklenir; geçmişte ne konuşulduğunu, hangi adımların atıldığını bilebilsin diye. Bununla da bitmez. LLM’in hangi uzmanlık alanında çalışacağını belirleyen prompt’lara ihtiyaç vardır. Bu prompt’ların yönetilmesi, versiyonlanması ve prompt injection gibi saldırılara karşı dayanıklı olacak şekilde tasarlanması gerekir. Kullanıcının talep ettiği işleri gerçekten yerine getirebilmesi için ise, LLM’in etkileşime girebileceği tool’lara ihtiyaç duyulur. Dosya sistemine erişmek, API çağırmak, veri işlemek ya da dış dünyayla temas kurmak bu katman üzerinden gerçekleşir.

Liste uzatılabilir. Ama temel fikir değişmez: LLM tek başına bir agent değildir.

LLM’i bir beyin gibi düşünebiliriz. Ancak bir beyin, tek başına bir organizma değildir. Beyni koruyan, dış dünyayla etkileşime sokan ve hareket kabiliyeti kazandıran katmanlar olmadan sağlıklı bir vücuttan söz edemeyiz. Agent dediğimiz yapı da tam olarak bu katmanların bir araya gelmesiyle ortaya çıkar.

## 3. Agent'ı Oluşturan Temel Bileşenler
Bir agent'i tek bir varlık olarak düşünmenin neden hatalı olduğunu gördük. Aslında bir agent, tekli bir varlık değil, birden fazla varlığın belirli ilişkiler içerisinde bir araya gelmesiyle oluşan bir yapı. Farklı frameworkler bu bileşenleri farklı isimlerle sunuyor olabilir. Ancak pratikte baktığımızda, hemen hemen tüm LLM agent tabanlı sistemler aynı temel varlıkları kullandığını görüyoruz.

Bu bölümde, bir agent'i oluşturan temel bileşenleri ve bu bileşenlerin birbirleriyle olan ilişkilerini, frameworklerden bağımsız bir şekilde ele almaya çalışacağım.

## 3.1. Agent Çekirdeği Katmanı
Bir agent’ı oluşturan tüm bileşenlerin merkezinde, sistemi bir arada tutan bir çekirdek bulunur. Bu çekirdek, çoğu zaman yanlış anlaşılan “agent” kavramının kendisidir.

Agent’ı çoğu yerde, iş yapan bir varlık gibi konumlandırılmış halde görürüz. Oysa pratikte agent, doğrudan iş yapan bir bileşen değildir. Agent’ın asıl rolü; karar vermek, yönlendirmek ve orkestrasyonu yönetmektir.

Bir agent, kendisine gelen girdiyi değerlendirir, mevcut bağlama bakar, gerekirse geçmiş etkileşimlerden faydalanır ve bir sonraki adımın ne olması gerektiğine karar verir. Bu adım bir mesaj üretmek olabilir, bir tool çağırmak olabilir ya da süreci başka bir agent’a devretmek olabilir. Ancak bu adımların hiçbiri “agent’ın kendisi tarafından yapılmaz”. Agent, bu adımların nasıl ve ne zaman yapılacağını belirler.

Bu yüzden agent’ı bir worker gibi değil, bir orkestratör gibi düşünmek gerekir. Agent, dosya okumaz, hangi dosyanın okunması gerektiğine karar verir. Dosyanın içeriğine göre ya kullanıcıya mesaj döner veya farklı bir tool çağrısı yapar.

Bu yaklaşım, farklı agent framework’lerine bakıldığında çok net şekilde ortaya çıkar. İsimler değişir, soyutlamalar farklılaşır, API’ler evrilir. Ancak agent’ın üstlendiği çekirdek rol neredeyse her zaman aynıdır: karar noktası olmak.

Agent’ın bu rolü yerine getirebilmesi için etrafında bir dizi yapılandırma bulunur. Hangi modeli kullandığı, hangi prompt’larla yönlendirildiği, hangi kurallara (policy) tabi olduğu ve hafızayı nasıl kullandığı bu yapılandırmalarla tanımlanır. Ancak bu yapılandırmalar agent’ın kendisi değildir; agent’ın davranışını şekillendiren dış katmanlardır. Agent, bu katmanları kullanır ama onlara indirgenemez.

Gerçek dünyadaki sistemlerde çoğu zaman tek bir agent yeterli olmaz. Bu noktada agent group kavramı devreye girer. Agent group, belirli bir amaç doğrultusunda birlikte çalışan agent’ların mantıksal bir organizasyonudur. Her agent kendi rolünü ve sorumluluğunu korur; ancak genel koordinasyon grup seviyesinde sağlanır. Multi-agent sistemlerin temelini oluşturan bu yapı, karmaşık görevlerin parçalanarak yönetilmesini mümkün kılar.

Özetle Agent Core katmanı, bir agent’ı “akıllı yapan” yer değildir; onu kontrollü, yönlendirilebilir ve genişletilebilir yapan katmandır. Agent’ın değeri, tek başına ne yaptığıyla değil, diğer bileşenleri nasıl orkestre ettiğiyle ortaya çıkar.

## 3.2. Etkileşim ve Akış Katmanı
Bir agent ne kadar iyi tasarlanmış olursa olsun, bağlam olmadan anlamlı kararlar veremez. Agent’ların çalıştığı yer, soyut bir boşluk değil; zaman, sıra ve etkileşim içeren bir akıştır. Bu akışı temsil eden yapı ise session kavramıdır.

Bir session, bir kullanıcı ile bir agent arasındaki belirli bir etkileşim sürecini kapsar. Başlangıcı vardır, ilerler, bazı çıktılar üretir ve sonunda tamamlanır. Agent’ın verdiği tüm kararlar, ürettiği mesajlar, çağırdığı tool’lar ve oluşturduğu çıktılar bu session bağlamı içinde gerçekleşir.

Bu yüzden session’ı, yalnızca teknik bir detay ya da “id taşıyan bir nesne” olarak görmek yanıltıcıdır. Session, agent’ın düşünme ve karar verme sürecinin zaman çizelgesidir.

### Session: Bağlamın Kendisi

Agent’lar stateless çalışan LLM’ler üzerine inşa edilir. Yani modelin kendisi, iki çağrı arasında doğal bir bağ kurmaz. Bu bağ, session tarafından sağlanır. Bir agent, geçmişte neler konuşulduğunu, hangi adımların atıldığını ve sürecin hangi aşamada olduğunu session üzerinden bilir.
Session olmadan:
    * “önce ne oldu?”
    * “hangi bilgi nereden geldi?”
    *  “bu karar neden alındı?”
gibi sorular cevapsız kalır.
Bu nedenle session, sadece mesajları tutan bir kapsayıcı değil; agent davranışının sürekliliğini sağlayan temel yapıdır.

### Message: Akışın Temel Birimi
Session içindeki akış, mesajlar üzerinden ilerler. Bir message, kullanıcıdan ya da agent’tan gelen tekil bir iletişim birimidir. Ancak message’ı yalnızca “bir metin parçası” olarak düşünmek eksik olur. Mesajlar: sıraya sahiptir, bir role (user, assistant, system) aittir, belirli bir zaman noktasında üretilir.

Bu özellikler sayesinde agent, diyalogun hangi aşamada olduğunu, kimin konuştuğunu ve hangi bağlamda cevap üretmesi gerektiğini anlayabilir. Başka bir deyişle message’lar, agent’ın kararlarını besleyen ham sinyallerdir.

### Akış Neden Bu Kadar Önemli?

Bir agent sisteminde asıl karmaşıklık, tek tek bileşenlerden değil; bu bileşenlerin zaman içinde nasıl etkileştiğinden doğar. Session ve message katmanı, bu etkileşimi görünür ve izlenebilir hale getirir.

Bir kullanıcı istekte bulunur -> Agent bu isteği bir mesaj olarak alır -> Gerekirse önceki mesajlara bakar -> Bir karar verir -> Bir mesaj üretir ya da bir tool çağırır.

Tüm bu süreç, tek bir akışın parçalarıdır ve bu akış session üzerinden takip edilir. Bu yaklaşım, hem sistemin debug edilebilir olmasını sağlar hem de agent davranışlarının analiz edilmesini mümkün kılar. Hangi kararın hangi bağlamda alındığı, hangi mesajın hangi sonucu doğurduğu bu katman sayesinde anlaşılır hale gelir.

### Observation: Görünmeyeni Görünür Kılmak

Bu akış sırasında, her şey mesaj olarak ortaya çıkmaz. Token kullanımı, gecikmeler, hata durumları veya maliyet bilgileri gibi veriler doğrudan diyalogun parçası değildir. Ancak sistemin sağlığı ve davranışı açısından kritik öneme sahiptir.

Bu noktada observation kavramı devreye girer. Observation’lar, bir session sırasında gerçekleşen işlemlere dair ölçümleri ve kayıtları temsil eder. Bu sayede agent sistemleri yalnızca “ne söyledi” üzerinden değil, nasıl çalıştı üzerinden de değerlendirilebilir.

### Etkileşim Katmanının Rolü
Etkileşim ve akış katmanı, agent’ın zekâsını artırmaz. Ancak agent’ın verdiği kararların: izlenebilir, analiz edilebilir, tekrar üretilebilir olmasını sağlar. Bu katman olmadan agent’lar sadece cevap üreten kara kutulara dönüşür. Session ve message yapısı ise bu kara kutuyu, anlaşılabilir bir sürece dönüştürür Bir sonraki adımda, agent’ın bu akış içinde dış dünya ile nasıl temas kurduğuna, yani tool’lar ve yetkinlik katmanına bakacağız.

## 3.3. Yetkinlik Katmanı
Bir agent’ı gerçek anlamda faydalı yapan şey, dış dünya ile etkileşime girebilmesidir. Bu etkileşimi mümkün kılan katman ise yetkinlik katmanıdır. Bu katmanın merkezinde yer alan ana aktörler ise tool’lardır.

Bir tool, agent tarafından çağrılabilen işlevsel bir dış işlem ya da sistem içi fonksiyondur. Başka bir deyişle tool’lar, agent’ın çevresiyle temas kurmasını sağlar. Dosya okumak, API çağırmak, veri güncellemek ya da başka bir sistemle konuşmak gibi işlemler bu katman üzerinden gerçekleştirilir.

Burada önemli bir ayrımı netleştirmek gerekir:
Tool’lar aktif karar vericiler değildir. Bir tool kendi başına çalışmaz, bağlam tutmaz ya da ne yapacağına karar vermez. Sadece çağrıldığında, kendisine verilen parametrelerle tanımlı bir işi yerine getirir.

Bunu somut bir örnekle düşünelim. Bir not uygulamasında kullanılan bir ChatBot Agent’iniz olduğunu varsayalım. Bu agent, notlarınızı okuyamıyor ya da düzenleyemiyorsa, verebileceği yardım oldukça sınırlı olacaktır. Sadece sohbet eden ama uygulamanın kendisiyle temas kuramayan bir agent, pratikte çok az değer üretir.

Bu noktada devreye tool’lar girer. Not okuma, not düzenleme ya da etiket ekleme gibi işlevleri yerine getiren metotlar yazıp bunları birer tool olarak agent sistemine entegre ettiğinizde, agent bu yetkinlikleri kullanabilir hale gelir. Agent, “hangi not okunmalı?”, “hangi etiket eklenmeli?” gibi kararları verir; ancak bu işlemleri bizzat kendisi yapmaz. İlgili tool’u çağırır ve sonucu değerlendirir.

Bu ayrım kritik bir noktayı netleştirir: Agent karar verir, tool uygular.

Yetkinlik katmanı, agent’a zekâ kazandırmaz. Ancak agent’ın verdiği kararların gerçek dünyada bir karşılığı olmasını sağlar. Tool’lar olmadan agent’lar yalnızca cevap üreten varlıklar olarak kalır. Tool’larla birlikte ise, çevresiyle etkileşime giren ve somut işler yapabilen sistemlere dönüşürler.

## 3.4. Hafıza Katmanı
Hafıza konusu agent sistemlerinde başlı başına geniş bir alan. Bu konuyu daha önce [Agent'larda Memory Kullanımı ve Türleri]({{< relref "agent-memory.md" >}}) başlıklı yazımda detaylıca ele almıştım; burada tekrar etmek yerine, hafıza katmanının bu yazıdaki rolünü kısaca konumlandırmak istiyorum.

Bu yazı bağlamında hafızayı, agent’a “zeka” kazandıran bir yapıdan çok, süreklilik ve bağlam sağlayan bir katman olarak ele alıyorum. LLM’ler doğası gereği stateless çalışır; geçmişte ne konuşulduğunu veya hangi adımların atıldığını kendi başına hatırlamaz. Hafıza katmanı bu kopukluğu giderir. Session bazlı hafıza kısa vadeli bağlamı korurken, uzun vadeli hafıza geçmiş etkileşimlerden faydalanılmasını sağlar. Ancak kritik nokta hafızanın varlığı değil, nasıl ve ne zaman kullanıldığıdır. Hangi bilginin saklanacağına ve geri çağrılacağına karar veren yine agent’ın kendisidir. Bu yönüyle hafıza katmanı, agent’ın karar mekanizmasını besleyen bir altyapı sunar. Tek başına anlam üretmez; doğru kullanıldığında agent davranışlarını tutarlı ve bağlam-aware hale getirir.

## 4. Agent’ları Bir Nesne Değil, Bir Sistem Olarak Düşünmek
Bu yazı boyunca LLM tabanlı agent’ları tekil, sihirli varlıklar olarak ele almanın neden yanıltıcı olduğunu anlatmaya çalıştım. Pratikte bir agent; bir model, birkaç prompt ya da bir API çağrısından ibaret değil. Agent, birden fazla bileşenin belirli ilişkiler içerisinde bir araya gelmesiyle oluşan bir sistemdir.

Agent çekirdeği karar verir ve orkestrasyonu yönetir. Etkileşim katmanı bağlamı ve akışı sağlar. Yetkinlik katmanı agent’ı dış dünyayla temas ettirir. Hafıza katmanı sürekliliği mümkün kılar.
Framework’ler, isimler ve API’ler zaman içinde değişebilir. Önümüzdeki aylarda agent ekosisteminin bambaşka yönlere evrilmesi de oldukça olası. Ancak bu değişimin altında yatan temel yapı uzun süredir büyük ölçüde aynı.

Bu yazının amacı bir standart önermek ya da “doğru” agent mimarisini tanımlamak değildi. Amaç, agent’ları düşünürken kullanılabilecek üst seviye bir zihinsel model sunmaktı. Agent’ları tek tek nesneler olarak değil; bileşenleri, ilişkileri ve akışı olan sistemler olarak ele almak, hem tasarım hem de bakım süreçlerinde ciddi bir netlik sağlar.

Agent ekosistemi büyümeye devam ettikçe, bu tür ortak temsil ve kontratlara olan ihtiyacın da giderek artacağını düşünüyorum.














