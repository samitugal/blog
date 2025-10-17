---
title: "Metadata Yönetimi ve MOF Kavramı"
date: 2025-10-14
draft: true
summary: "Metadata Yönetimi ve MOF Kavramı hakkında konuşuyoruz."
tags: ["metadata", "mof", "data management"]
categories: ["data management"]
---

## 1. Giriş: Veriden Anlama Yolculuğu
İnternet aleminde yaptığımız her etkileşim aslında bir veridir. İnternet çağında yaşadığımızı düşünürsek, ne kadar büyük miktarda veri üretildiğini tahmin etmek güç değildir. Bu veri hacmi o kadar büyüdü ki, artık trilyonlarca tokenlik veriyle eğitilen büyük dil modellerinden bahsediyoruz. Öyle ki bazı modeller, neredeyse kendi kendilerini eğitebilecek kadar büyük ve kapsamlı veri kümeleri üzerinde çalışıyor.

Peki, sahip olduğumuz bu veriyi gerçekten ne kadar tanıyoruz? Günümüzde şirketler petabaytlarca veriyi depoluyor; müşteri işlemleri, sensör okumaları, tıklama geçmişleri, belge içerikleri… Ancak bu verilerin ne anlama geldiğini, nasıl ilişkilendirileceğini ve hangi bağlamda üretildiğini bilmezsek elimizde yalnızca bir gürültü yığını kalır.

Kendi deneyimimden örnek vereyim: Daha önce iki farklı bankada çalışma fırsatım oldu ve bu kurumlarda doğrudan veritabanlarıyla çalışma şansım vardı. Gözlemim şuydu; birkaç temel kaynak tablo dışında, iş birimlerine özel oluşturulmuş özet tabloların çoğunda kimse neyin ne işe yaradığını, kolonların ne anlama geldiğini bilmiyordu.
Bir ETL beslemesi eklenmemiş, açıklaması olmayan yüzlerce tablo… Verinin kendisi vardı ama anlamı yoktu.

Peki verinin anlamını bilmeden bu kadar veriyi depolamak bize gerçekten fayda sağlar mı? Yoksa sadece karmaşayı büyüten bir yük mü yaratır?

## 2. Metadata Nedir?
İşte tam bu noktada, verinin anlamını yöneten katman olan metadata devreye giriyor. Verinin kendisini anlamlandıran şey metadata’dır; yani sahip olduğumuz verinin verisidir. Metadata, veriyi yalnızca saklanabilir değil, anlaşılabilir hale getirir.

Bir tabloyu gördüğünüzde hangi alanın müşteri adı, hangisinin işlem tarihi olduğunu söyleyebiliyorsanız, bunu metadata sayesinde yapıyorsunuzdur. O olmadan elimizdeki veri sadece ham, anlamsız bir yığın olur.

Basit bir örnek düşünelim:
Evcil hayvanınızın bir fotoğrafını ele alalım. Dijital olarak bu fotoğraf yalnızca RGB piksel değerlerinden oluşur.
Ama dosya adı, boyutu, çekildiği tarih ya da konum bilgisi gibi tanımlayıcılar eklendiğinde artık yalnızca bir resim değil, anlamlı bir içerik haline gelir. Metadata işte bu dönüşümü mümkün kılan şeydir.

Kurumsal ölçekteyse metadata, yüzlerce tablo ve milyonlarca satır veri arasında ortak bir dil oluşturur. Veri analistinden yazılım geliştiricisine, yöneticiden yapay zekâ modeline kadar herkesin aynı şeyi kastetmesini sağlar. Bu nedenle metadata yalnızca teknik bir detay değil; anlamın, bağlamın ve güvenin temelidir.

## 3. Metadata Katmanları ve MOF
### 3.1 MOF Nedir?
MOF (Meta Object Facility) en basit tabiriyle, metadata’yı tanımladığımız modelleme sistemidir.
Yani sahip olduğumuz veriyi açıklayan yapıları (bu yapıları 4. bölümde detaylıca inceleyeceğiz) tanımlayan meta-modeli bile, bir üst düzey model ile tanımlar.

MOF kavramı ilk kez OMG (Object Management Group) tarafından ortaya atılmıştır — aynı kurum UML (Unified Modeling Language) standardını da geliştirmiştir. Amaç, farklı modelleme dillerine ortak bir çatı sağlamaktı. UML, BPMN veya CWM gibi modelleme sistemleri birbirinden farklı görünse de aslında hepsi MOF üzerine inşa edilmiş meta-dillerdir.

Bir bakıma MOF, modelleme evreninin “Big Bang teorisi” gibidir: Her şey ondan türemiştir ama kendisi hepsinin üstündedir.
Altındaki katmanlarda değişiklikler olabilir (bir model M1 seviyesindeyken M2’ye çıkarılabilir) fakat MOF her zaman en üst katman olarak kalır.

Veri dünyasını dört katmanlı bir piramit gibi düşünebiliriz: M0’dan M3’e uzanan bir yapı. En altta somut veri bulunur, en üstte ise bu veriyi yöneten ve tanımlayan yasalar yer alır. Şimdi bu katmanları biraz daha yakından inceleyelim.

### 3.2 M0 Katmanı

M0 Katmanı, gerçek dünyanın kendisidir. Somut veri bu katmanda bulunur. Bu katmanda herhangi bir şema veya kural yoktur, sadece verinin kendisi vardır. Veritabanınızda bulunan tablolardaki kayıtlı veri M0 katmanında bulunur.

Gözlemlediğimiz olaylar, ölçümler, belgeler, fotoğraflar, sistem logları — hepsi M0’dır. Tıpkı bir dil modelinin metin token’ları gibi, M0 da yalnızca ham veri parçalarından oluşur.

### 3.3 M1 Katmanı
### 3.4 M2 Katmanı
### 3.5 M3 Katmanı
## 4. Metadata’yı Oluşturan Yapılar
### 4.1 ENTITY
### 4.2 ATTRIBUTE
### 4.3 DOMAIN
### 4.4 RELATIONSHIP
### 4.5 ATTRIBUTE TYPE
### 4.6 ENTITY OCCURRENCE
### 4.7 IDENTIFIER
### 4.8 KEY ATTRIBUTE
### 4.9 SUBTYPING
### 4.10 SUBTYPE CATEGORIZATION
### 4.11 FOREIGN IDENTIFIER
## 5. Metadata Yönetimi Neden Bu Kadar Önemlidir?
### 5.1 Metadata Governance ve Kalite
## 6. Özet
