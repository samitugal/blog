---
title: "Data Mesh"
date: 2025-08-22
draft: false
summary: "Merkezi veri ambarı mimarilerinin sorunlarına çözüm sunan Data Mesh yaklaşımını, dört temel prensibi ve iş dünyasındaki önemini ele alıyoruz."
tags: ["data", "data governance", "data governance paradigms"]
categories: ["data"]
---

# Data Mesh Nedir?

Verinin yıllar içerisinde oldukça önem kazanmasıyla beraber veri yönetimi, verinin işlenmesi, verinin depolanması gibi konularda bir çok fikir ortaya atılmıştır. Bunlar içerisinde data mesh gerek yenilikçi fikirleri gerek de vaat ettiği iş kolaylıkları açısından öne çıkan fikirlerden biri.

2019 yılında Zhamak Dehghani tarafından ilk kez isimlendirilen kavram yıllar içerisinde geliştirilmiş, ana hatlarıyla ortaya konulmuştur. Günümüzde kullanılan veri ambarı gibi merkeze sahip mimari yerine; merkeziyetsiz, self-service hizmet verebilen, her noktadan veriye yüksek seviyede erişimin sağlanabildiği ve yazılım mühendisliğinde kullanılan mikroservis mimarisinin, veritabanı yönetim mimarisine entegre edildiği bir platform yaratmayı amaçlar.

Verinin bir ara ürün olarak değil, ürünün kendisi olarak değerlendirilmesini bekler (Data as a Product). Zhamak Dehghani Data Mesh paradigmasını dört temel prensip üzerine kurmuştur. Bu prensipler şunlardır:

---

## 1. Principle Of Domain Ownership

Data Mesh yaklaşımının temelinde merkeziyetsiz ve dağıtılmış verinin yönetim sorumluluğunu veriye en yakın birime verme fikri bulunur. Bu durum değişiklilere hızlı bir şekilde adapte olmak gibi konularda avantaj sağlar ancak bu paylaşıma göre ortaya verinin nasıl bölüneceği, sınırların nasıl belirleneceği, sorumluluklarına nasıl dağıtılacağı soruları ortaya çıkar.  
Bu bölünecek noktaların belirlenmesi için Data Mesh kurum içerisindeki sorumluluk sahalarından yola çıkar. İşlere göre sorumluluk dağılımını takip eder.

### Örnek:
Bir banka içerisinde ATM işlemleri birimi için hazırlanması gereken ad hoc ortamını, veri ambarından sorumlu analitik raporlama ekibi hazırlamaz çünkü veri onların sorumluluğu altında değildir. ATM işlemlerinin verisinin içeriğini ve istenilen ad hoc ortamının gereksinimlerini analitik raporlama ekibi tam olarak bilemez. Bu verinin sorumluluğu verinin içeriğine bilen ATM işlemleri birimi kendi içerisinde hazırlaması beklenir.

Klasik veri ambarı mimarisinde ad hoc ortamı hazırlama görevi analitik raporlama biriminin görevidir çünkü sorumluluk kullanılan araca göre dağıtılır. Bu durum bazı aksaklıklara neden olabilir.

---

## 2. Principle Of Data as a Product

Data as a product prensibi verinin sahibi olan domainin analitik veriyi bir ürün olarak değerlendirmesini ve verinin kullanıcılarını da — diğer domainler gibi — müşteri olarak değerlendirmesini bekler. Bu durum sonucunda ürün olarak ortaya konulması gereken analitik verinin sahip olması gereken bazı nitelikler ortaya çıkar:

- **Keşfedilebilirlik**: Veri kullanıcıları yeni bir proje karşısında yaptıkları ilk iş veri setini keşfetmektir; buna göre bir veri ürününün en önemli özelliği kolay bir şekilde keşfedilebilir olmasıdır.
- **Adreslenebilirlik**: Her veri ürününe kolay erişilebilmesi için eşsiz (unique) bir adrese sahip olmalıdır.
- **Anlaşılabilirlik**: Bir veri setini keşfettikten sonra yapılması gereken bir sonraki adım veriyi anlamaktır. Bir kullanıcı veri ürününün hangi tür varlıkları (entity) içerdiğini ve bu varlıklar arasındaki ilişkileri kolaylıkla anlayabilmelidir.
- **Güvenilirlik**: Kimse güvenmediği bir ürünü kullanmaz. Veri ürünü tutarlı veriler ortaya koymalıdır. Kullanıcının bildiği iki noktayı tutarlı bir şekilde bağlamalıdır.
- **Erişilebilir**: Bir veri ürününe erişim kolay olmalıdır.
- **Birlikte Çalışabilirlik**: Analitik veri üzerinde çalışma yaparken genellikle birçok farklı kaynaktan veri kullanılır. Bu nedenle çeşitli veri ürünlerinin kendi içerisinde uyumlu, birlikte çalışabilir formatta olması gerekir.
- **Değer Sahibi**: Bir varlığın değer taşıması için bir anlam ifade etmesi gerekir. Bir veri ürünü de bir anlama sahip olmalı, kullanılacağı bir alan olmalıdır.
- **Güvenli**: Kullanıcılar veriye güvenli ve gizliliğe uygun bir biçimde ulaşmalıdır. Mimarisi ne olursa olsun veri güvenliği bir zorunluluktur.

Bu veriye yeni yaklaşım beraberinde birtakım yeni roller getirir:

- **Veri Ürünü Geliştiricisi (Data Product Developer)**  
  Veri ürünlerinin kullanıldığı süre boyunca geliştiren, bakımlarını yapan ve sunumu gerçekleştiren roldür.

- **Veri Ürünü Sahibi (Data Product Owner)**  
  Veri ürünlerinin kullanıldığı süre boyunca product kullanıcılarının isteklerini tatmin etmeye çalışan, takım içerisindeki görev dağılımını yapan, ürüne değer katan roldür.

---

## 3. Principle of the Self-Serve Data Platform

Data Mesh yapısında birçok domain bulunduğu için bu domainlerin ortak kullanabileceği platforma ihtiyaç duyulmuştur. Bu nedenle Data Mesh yapısı içerisinde bir platform kurulması öngörülmüştür. Bu platformun temel amacı domainlerin analitik verileri veya makine öğrenmesi algoritmalarını geliştirmek için kullanacağı verileri özgür bir şekilde kullanmasına imkan tanımaktır. Bunu sağlamak için bir domain başka bir domainin iş akışına (workflow) dahil olmadan işlerini tamamlayabilmesi beklenir.

### Örnek:
Klasik veri ambarı mimarisinde bulunan bir tabloyu kurum içerisinde yer alan iki takıma ait veriler besliyor. Bu tablonun kullanımı sırasında iki taraf da birbirini beklemesi gerekmektedir; yani birbirlerinin iş akışlarına müdahil olma durumu söz konusu olmaktadır. Data Mesh Platformu bu sorunu ortadan kaldırır.

Data Mesh Platformunun sahip olması gereken bir diğer özellik, karmaşıklığı minimuma indirip domainler arasında gerçekleşecek veri ürünü alışverişini kolaylaştırmasıdır. Bu sayede domainler gereksiz bürokrasi ile zaman kaybetmeyip yapması gereken işe rahatça odaklanabilirler. Bu karmaşıklığı minimuma indirmek için self-servis otonom bir yetkilendirme sistemi gibi ürünler kullanılabilir.

---

## 4. Principle of Federated Computational Governance

Üstteki prensiplerden sonra geriye son bir eksik parça kalıyor: **Güvenlik**. Data Mesh özerk takımların kendi verisi üzerinde bağımsız bir şekilde çalışmasını bekler ve bunu gerçekleştirmek için Self-Serve Data Mesh platform yapısına güvenir. Bu bağımsız domainlerin ve tüm data product’ların bir bütün olarak güvenilir bir mekanizma tarafından denetlenmesi gerekir. Bu sebeple Data Governance takımları Data Mesh platformu içerisinde görev alır.

Data Governance takımlarının asli görevi, çalıştıkları kuruluşta güvenli, yüksek kaliteli, tutarlı verilerin kullanılabilirliğini sağlamaktır; ayrıca platform içerisinde yer alan güvenlik ilkelerinin domainlerde ve veri ürünleri üzerinde uygulanıp uygulanmadığını denetler.

Peki bu özerk yapıda kurallar nasıl belirlenir?

Data Mesh platformu veri ürünü sahipleri ve veri platformu sahipleri (data platform owner) taraflarının ortak kararlarıyla bir dizi genel kurallara sahiptir. Sistemdeki bütün domainler kendi alanları içerisinde yerel karar alma yetkisine sahipken, genel kurallara da uymak zorundadırlar.

Genel kurallar güvenli, veri gizliliğine önem veren ve birlikte çalışabilir bir ekosistem yaratmak için hukuk, veri güvenliği gibi alanlardan faydalanır.

---

## Özet

Data Mesh, yakın gelecekte veri yönetimi konusunda adını sıklıkla duyacağımız bir kavram. Merkezi veri mimarisinin sorunlarına büyük ölçüde çözüm olabilecek potansiyele sahiptir. Yakın bir gelecekte kuruluşlar veri gölleri (Data Lake), veri ambarı (Data Warehouse) yaklaşımlarını terk edip, veriye farklı bir şekilde yaklaşan Data Mesh platformuna geçeceğini düşünüyorum.
