---
title: "RAG Pipeline Optimizasyon Teknikleri"
date: 2025-08-30
lastmod: 2025-08-30
draft: false
description: "RAG pipeline optimizasyonu: chunking stratejileri, embedding seçimi, retrieval kalitesi ve LLM entegrasyonu. Etkili RAG uygulamaları için rehber."
summary: "Bu yazıda RAG Pipelinelerini nasıl daha efektif hale getirebiliriz onu tartışıyoruz."
slug: "rag-pipeline-optimizasyon"
keywords: ["RAG", "retrieval augmented generation", "LLM", "embedding", "vector database", "chunking", "yapay zeka"]
tags: ["generative ai", "RAG", "agents"]
categories: ["tech"]
author: "Sami Tuğal"
---

## Retrieval Augmented Generation

Bugün sizlerle **RAG (Retrieval Augmented Generation)** uygulamalarımızı nasıl daha **efektif** hale getirebiliriz onu tartışacağız.  
Hepimizin bildiği gibi LLM’ler tek başlarına güçlü araçlar ama bazen güvenilir, güncel veya bağlama uygun bilgi sunmada yetersiz kalabiliyorlar.  
İşte bu noktada RAG devreye giriyor ve LLM’in yanında bir “bilgi motoru” gibi çalışıyor.  

Bu taktikleri ben de kendi projelerimde kullanıyorum. O yüzden hem burada not kalsın hem de sizlerde faydalanırsınız 😄. 

---

## Geleneksel RAG vs Agentic RAG

- **Geleneksel RAG**: Kullanıcının sorgusu embedding’ler aracılığıyla vektör veritabanında aranır. En alakalı parçalar modele eklenir ve model bunları kullanarak yanıt üretir.  
- **Agentic RAG**: Burada LLM’e yalnızca bağlam verilmez, aynı zamanda **tool’lar** tanımlanır. Model gerektiğinde bu tool’ları çağırarak knowledge base’e erişebilir.  

Her iki yöntem de güçlüdür, fakat **production-ready uygulamalarda** ölçek büyüdükçe (milyonlarca embedding olduğunda) bazı sıkıntılar yaşanır:  
- Sorgu süreleri uzar  
- Maliyet artar  
- Sistem hantallaşır  

Bunları aşmak için RAG pipeline’ını üç aşamada optimize etmek gerekir: **Pre-Retrieval, Retrieval ve Post-Retrieval**.

---

## 1. Pre-Retrieval Aşaması

Retrieval başlamadan önce yapılan hazırlıklar, performansın bel kemiğidir.

### 1.1 Data Indexing
Dokümanlar temizlenmeli, küçük parçalara (chunk) bölünmeli ve özenle indekslenmelidir.  
- Gürültülü veya gereksiz veriler embedding’e dönüştürülürse hem maliyet artar hem de retrieval kalitesi düşer.  

### 1.2 Query Optimization
Kullanıcının sorgusu, embedding oluşturma sürecinde kullanılan temizleme kurallarıyla uyumlu hale getirilmelidir.  
- Örn: Embedding öncesi stopword’ler temizlendiyse, sorgudan da temizlenmelidir.  

### 1.3 Sliding Window
Chunk’lar arasında **overlap** değeri dikkatli ayarlanmalıdır.  
- Çok küçük overlap → bilgi kaybı  
- Çok büyük overlap → gereksiz tekrar ve maliyet  
Özellikle akademik, hukuki ve medikal dokümanlarda kritik öneme sahiptir.  

### 1.4 Metadata
Embedding’lere tarih, konu, yazar gibi metadata eklemek retrieval sırasında büyük kolaylık sağlar.  
- Örn: “Sadece 2024 sonrası sağlık raporlarını getir”  

### 1.5 Query Rewriting
Sorgu vektör DB’ye gitmeden önce yeniden yazılabilir. Bu ek bir LLM çağrısı gerektirir, ancak daha isabetli sonuçlar sağlar.  
- **Paraphrasing**: “İklim değişikliğine neler sebep olur?” → “İklim değişikliği sebepleri”  
- **Synonym Substitution**: “İklim buhranının müsebbipleri” → “İklim krizinin sebepleri”  
- **Sub-queries**: Uzun bir sorguyu küçük parçalara bölmek, ardından sonuçları birleştirmek  

---

## 2. Retrieval Aşaması

Asıl sorgulama bu aşamada gerçekleşir. Burada yapılacak optimizasyonlar doğrudan hız ve maliyeti etkiler.

### 2.1 Hybrid Search
Salt semantic search yerine **anahtar kelime + semantic search** birleşimi kullanılmalıdır.  
- Örn: “Türkiye’de yapay zekâ” sorgusu  
  - Önce keyword search ile küçük bir aday kümesi çıkarılır  
  - Sonrasında bu alt kümede semantic arama yapılır  
  - Böylece milyonluk bir veritabanında tarama yapmak yerine çok daha küçük bir uzayda işlem yapılır  

### 2.2 Filtered Vector Search
Metadata kullanılarak arama alanı daraltılır.  
- Örn: “2022 sonrası finans raporları” → Tarih filtresi ile yalnızca ilgili embedding’ler taranır  

---

## 3. Post-Retrieval Aşaması

Retrieval tamamlandıktan sonra sonuçları doğrudan modele vermek her zaman en iyi çözüm değildir.

### 3.1 Prompt Compression
Seçilen doküman parçaları çok uzun olabilir. Bu durumda içerik sıkıştırılır veya özetlenir.  
- Hem token maliyeti düşer  
- Hem de model daha odaklı bir şekilde yanıt üretir  

### 3.2 Re-Ranking
Retrieval’dan dönen sonuçların hepsi eşit kaliteli değildir.  
- Basit heuristic yöntemler veya ayrı bir model ile sonuçlar yeniden sıralanabilir  
- Kullanıcıya en uygun sonuç en üstte sunulur  

---

## Sonuç

RAG, LLM tabanlı sistemlerde **bilgi tazeliği** ve **doğruluk** için vazgeçilmezdir. Ancak ölçek büyüdüğünde sistemin hantallaşmasını önlemek için pipeline’ın her aşamasında optimizasyon şarttır.  

- **Pre-Retrieval**: Temizleme, indexleme, query rewriting  
- **Retrieval**: Hybrid search, filtreleme  
- **Post-Retrieval**: Sıkıştırma, yeniden sıralama  

Bu yöntemleri uygulayarak hem kullanıcı deneyimini iyileştirmek hem de production ortamlarında maliyeti kontrol altında tutmak mümkündür.  

Bu yazıyı hazırlarken *LLM Engineer’s Handbook* kitabından da ilham aldım. İlgilenenlere kesinlikle tavsiye ederim.  

---