# Halleder

Halleder'in tanıtım sayfası ve bekleme listesi. Halleder, küçük işletmeler için yapay zekâ otomasyonu hizmeti.

| Dosya | Ne işe yarar |
| --- | --- |
| `index.html` | Tanıtım sayfası. Tek dosya, derleme adımı yok. |
| `waitlist-apps-script.gs` | Kayıtları Google Tablosu'na yazan arka uç. |

## Bekleme listesini bağla

Sayfa statik olduğu için kayıtları gönderecek bir yer lazım. Aşağıdaki adımları
yapana kadar form, ziyaretçiye "Bekleme listesi henüz bağlı değil" der ve hiçbir
şey kaydetmez.

1. Yeni bir Google Tablosu aç ve adını "Halleder bekleme listesi" yap.
2. **Uzantılar → Apps Script**'i aç ve içindekileri `waitlist-apps-script.gs` ile değiştir.
3. **Dağıt → Yeni dağıtım → Web uygulaması**'na tıkla.
   - Şu kullanıcı olarak çalıştır: **Ben**
   - Erişimi olanlar: **Herkes**
4. Google'ın istediği izinleri onayla ve **Web uygulaması URL'sini** kopyala.
5. URL'yi tarayıcıda aç. "Halleder bekleme listesi çalışıyor." yazmalı.
6. `index.html` içinde `const WAITLIST_ENDPOINT = "";` satırına URL'yi yapıştır ve kaydet (commit).
7. Formu kendi e-postanla bir kez doldur. Tabloda "Bekleme listesi" sekmesi ve bir satır görünmeli.

Scripti sonra değiştirirsen **Dağıt → Dağıtımları yönet → Düzenle → Yeni sürüm**'ü
kullan, böylece URL aynı kalır.

Tarayıcı Google'ın cevabını okuyamaz. Bu yüzden sayfa, istek gönderilir gönderilmez
"Listedesin" der. Aynı e-posta ikinci kez gelirse script onu yok sayar.

## Yayına al

Sayfa herhangi bir statik barındırmada çalışır. En kolay seçenekler:

- **GitHub Pages:** Settings → Pages → bir daldan yayınla. Sayfa `/halleder/` adresinde olur.
  Ayrı bir site istersen bu klasörü kendi deposuna taşı ve `index.html`'i kök dizine koy.
- **Cloudflare Pages** veya **Netlify:** klasörü sürükleyip bırak.

Sonra bir alan adı (domain) alıp barındırmaya yönlendir.

## Sayfayı düzenle

- Yazılar `index.html` içinde. Değiştirmek istediğin cümleyi arayıp düzelt.
- Renkler ve yazı tipleri, `<style>` bloğunun en üstündeki değişkenler.
- Giriş bölümündeki çalışma kaydı örnek amaçlıdır ve öyle etiketlenmiştir. Gerçek bir
  müşterinin verisiyle ve izniyle değiştirmedikçe bu etiketi silme.
- Formun altındaki gizlilik cümlesi, insanların listeden çıkabileceğini vaat ediyor.
  Sadece bunu gerçekten yapacaksan bırak.
- Türkiye'de e-posta adresi toplamak kişisel veri toplamak sayılır (KVKK). Gerçek
  kayıt almaya başlamadan önce bir büyükle birlikte bir aydınlatma metni hazırlamak iyi olur.
