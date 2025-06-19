---
title: "Semantic Tool Search & Dynamic Tool Injection"
date: 2025-06-15
draft: false
summary: "Bu yazıda agent mimarilerinde semantic tool search ve dynamic tool injection kavramlarını gerçek bir örnekle ele alıyorum. MCP protokolüyle birlikte nasıl ölçeklenebilir ve verimli sistemler kurabileceğimizi anlatıyorum."
tags: ["generative ai", "mcp", "agents"]
categories: ["tech"]
---

## Agentlar Nedir?

Her yerde Agentların tanımlaması var ama bir de benden dinleyin 🙂 Agent yapıları, dil modellerini daha yetenekli hâle getirmek için geliştirilmiş sistemlerdir. Temel amaç, modele yalnızca metinle yanıt vermek yerine, dış dünya ile etkileşime geçebilecek yetenekler kazandırmaktır. Bu yetenekler arasında API çağrıları yapmak, veri tabanına sorgu göndermek, dosya üretmek ya da başka bir aracı servisle konuşmak yer alabilir.

Basitçe söylemek gerekirse:  
> **Her şey sadece bir for döngüsüdür**

Bir kullanıcı "son 3 ayın satışlarını göster" dediğinde, modelin bunu anlayıp gerekli API’yi çağırması, ardından gelen cevabı anlamlandırıp kullanıcıya sunması beklenir. Bu süreci mümkün kılan temel bileşenlerden biri de "function calling" mekanizmasıdır.

---

### Kısaca Function Calling

Function Calling, dil modelinin bir fonksiyonu çağırmasına olanak tanıyan bir iletişim yapısıdır. Model, normal bir metin cevabı üretmek yerine, dış dünyada tanımlanmış bir fonksiyonu tetikleyebilir ve geri gelen sonucu kullanıcıya iletebilir.

Örneğin:

```json
{
  "function_call": {
    "name": "get_invoice_summary",
    "arguments": {
      "start_date": "2024-01-01",
      "end_date": "2024-03-31"
    }
  }
}
```

---

## MCP (Model Context Protocol)

MCP, yani Model Context Protocol, 2024 yılında Anthropic tarafından duyuruldu ve kısa sürede birçok geliştirici tarafından benimsendi.  

Temel amacı:
> **Dil modeli ile tool'ların bulunduğu katman arasında bir soyutlama (abstraction layer) sağlamak.**

Yani model her seferinde “hangi tool var, ne işe yarıyor, hangi parametreleri alıyor?” gibi detaylarla uğraşmak zorunda kalmasın. Bunun yerine MCP, bu bilgileri düzenli bir şekilde modele sunar.

Bu yaklaşım sayesinde:
- Tool sayısı arttıkça yönetilebilirlik bozulmaz,
- Yeni bir tool eklemek sistemi bozmaz,
- Modeller daha düzenli, öngörülebilir şekilde davranır.

İşin güzel tarafı şu: MCP sadece “hangi fonksiyonu çağırayım” demekle kalmaz. Aynı zamanda bu çağrıların ne zaman yapılacağı, hangisinin önce hangisinin sonra geleceği gibi şeyleri de tanımlayabilir. Yani bir nevi dil modeline yol gösteren bir kurallar bütünü diyebiliriz.

Özellikle çok fazla tool olan sistemlerde — mesela ERP gibi — MCP sayesinde işler hem daha **şeffaf**, hem daha **yönetilebilir** hâle geliyor.

Merak ediyorsanız, [Model Context Protocol'ün kendi sitesine](https://modelcontextprotocol.io/introduction) göz atabilirsiniz. Kısa ama öz bir anlatımla ne işe yaradığını çok net açıklıyorlar.

![MCP Architecture](/images/mcp.png)

---

## Semantic Tool Search & Dynamic Tool Injection

### Semantic Tool Search

Semantic Tool Search, geniş bir tool havuzundan sadece alakalı olanları seçip modele iletmek için kullanılan bir ara katmandır. LLM’in her seferinde tüm tool’ları bilmesini gerektirmeden, kullanıcı isteğine uygun olanları **vektör temsiller üzerinden** belirler.

Bu yapı genellikle embedding tabanlı bir arama servisiyle çalışır: Kullanıcının prompt’u bir vektöre dönüştürülür, ardından bu vektör tüm tool açıklamalarıyla karşılaştırılır ve en yakın olanlar seçilir. Böylece model sadece ihtiyacı olan toollarla çalışır; fazla yük taşımadan, daha doğru kararlar verir.

Bu katman, agent sistemlerinde ölçeklenebilirliği mümkün kılar — yüzlerce tool tanımına sahip senaryolarda bile sade ve verimli bir çalışma sağlar.

---

### Dynamic Tool Injection

Semantic Tool Search ile elde edilen tool listesi, modele **dinamik olarak** enjekte edilir. Yani modelin başlangıçta tüm tool'ları bilmesine gerek kalmaz; yalnızca arama sonuçlarına göre en alakalı olanlar, context'e yerleştirilir.

Bu yaklaşım “Dynamic Tool Injection” olarak adlandırılır. Tüm tool katalogunu prompta gömmek yerine, sadece görevle alakalı tool’ların seçilip modele inject edilmesi sağlanır.  
Bu sayede:
- **Token maliyeti** düşer,
- **Modelin kararsızlığı** azalır (bkz: Paradox of Choice),
- Tool parametreleri daha sade ve odaklı hale gelir.

MCP protokolüyle birlikte kullanıldığında, Dynamic Tool Injection yapısı hem agent mimarisinde esneklik sağlar hem de performansı ciddi oranda artırır.

---

### Neden Böyle Bir Yaklaşım Tercih Edilebilir?

MCP yaklaşımının hızla popülerleşmesiyle birlikte, SaaS hizmeti sunan birçok firma ürünlerini MCP destekli hale getirmeye başladı. En son gördüğümde Türk Hava Yolları, kendi MCP sunucusunu yayınlamıştı. İncelemek isteyenler için [Türk Hava Yolları MCP sunucu dökümantasyonu](https://mcp.turkishtechlab.com/) oldukça düzenli ve iyi örneklenmiş. İçerisinde yeterli sayıda tool tanımlı ve oldukça işlevsel; göz atmanızı öneririm.

Ancak bu yapı küçük örnekler için uygun olsa da, gerçek bir ERP uygulaması gibi karmaşık sistemlerde ciddi ölçek sorunları ortaya çıkıyor. Örneğin böyle bir sistemde 250'den fazla tool tanımlamak gerekebilir. Bu durumda tüm tool bilgilerini doğrudan prompta eklemek hem ciddi bir **token maliyetine** yol açar, hem de modelin bu kadar çok seçenek arasından doğru tool’u seçme olasılığı düşer.

Bu durum, psikolojide "Paradox of Choice" olarak bilinen olguyla da örtüşür. Seçenekler arttıkça, karar verme süreci zorlaşır ve bazen doğru kararı vermek imkânsız hâle gelir. Aynı durum dil modelleri için de geçerlidir: yüzlerce tool arasında seçim yapması beklenen bir modelin hataya düşme ihtimali artar.

İşte bu noktada **Semantic Tool Search** katmanı devreye girer.

Prompt içine tüm tool bilgileri yerleştirilmez. Bunun yerine yalnızca bir "tool search" aracı tanımlanır. Promptun içinde dil modeline bu aracı kullanarak uygun toolları belirlemesi gerektiği söylenir.

Model, kullanıcının isteğini vektörel temsile dönüştürür ve semantic search yaparak en alakalı tool’ları bulur. Bu sonuçlar modele döner; model de bu sonuçlardan uygun olanları seçer, parametreleri hazırlar ve işleme devam eder.

![Semantic Tool Search Workflow](/images/semantic-tool-search.png)

*Yukarıdaki görselde MCP Client ile başlayan bir istek akışının, semantic search üzerinden filtrelenmiş tool’lara nasıl yönlendiği gösteriliyor. Semantic katman sayesinde yüzlerce tool bilgisinin doğrudan prompta eklenmesine gerek kalmadan, en alakalı olanları seçip modele sunmak mümkün hâle gelir.*

---

## Nasıl Yapılır?

Yukarıda anlattığım mimariyi gerçek bir senaryoda nasıl kurabiliriz derseniz, kendi geliştirdiğim basit bir implementasyondan bahsedeyim. Aşağıda özetlediğim yapı sayesinde yüzlerce MCP tool’undan sadece gerekli olanları semantik olarak seçip çalıştırabiliyorum.

1. Tool'ları Topla ve Embed Et

İlk adım olarak MCP sunucusundan mevcut tool listesini alıyoruz. Her bir tool’un adı ve açıklaması SentenceTransformer modeli ("all-MiniLM-L6-v2") ile vektöre dönüştürülüyor. Bu vektörler FAISS kütüphanesiyle arama yapılabilecek bir veri tabanına ekleniyor.

```python
tools = await client.list_tools()
embeddings = model.encode([f"{tool.name} {tool.description}" for tool in tools])
vector_db.add(embeddings)
```

2. Query'yi Embed'le ve Arama Yap

Kullanıcının doğal dilde verdiği isteği de benzer şekilde embed ediyoruz ve FAISS veri tabanında en yakın tool'ları buluyoruz.

```python
query_embedding = model.encode("stokları listele")
results = vector_db.search(query_embedding, k=5)
```

3. En Alakalı Tool'u Çalıştır

Eğer search_and_execute fonksiyonunu kullanırsanız, sistem en alakalı tool’u seçiyor, parametrelerini otomatik tahmin ediyor ve MCP üzerinden çağırıyor:

```python
result = await embeddings.search_and_execute_tool("stokları listele")
```

Bu fonksiyonun içinde:
- Semantic search yapılır,
- En yakın tool seçilir,
- Gerekirse input parametreleri tahmin edilir (örneğin query, k, limit gibi alanlar),
- Ve model call_tool fonksiyonu ile çalıştırılır.

4. Öneri Modu da Var

İsterseniz sadece öneri almak için search_and_suggest fonksiyonu da mevcut. Bu fonksiyon semantik olarak en uygun tool’ları döndürür ve input şemalarına göre önerilen parametreleri de listeler:

```python
results = await search_and_suggest("satış raporlarını göster", k=3)
```

Bu yapının en güzel tarafı şu: Tool sayısı artsa bile sistem aynı hızda çalışıyor. Prompt’a hepsini koymaya gerek yok. Sadece semantic arama sonucu inject edilen kısıtlı tool’larla çok daha doğru ve verimli sonuç alıyorsunuz.

## Daha Fazlası İçin

- [Model Context Protocol – Official Docs](https://modelcontextprotocol.io/introduction)
- [SentenceTransformers](https://www.sbert.net/)
- [FAISS (Facebook AI Similarity Search)](https://github.com/facebookresearch/faiss)


