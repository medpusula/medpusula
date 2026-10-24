# Halleder

Halleder'in tanıtım sayfası ve bekleme listesi. Halleder, küçük işletmeler için yapay zekâ otomasyonu hizmeti.

| Dosya | Ne işe yarar |
| --- | --- |
| `index.html` | Tanıtım sayfası. Tek dosya, derleme adımı yok. |

## Bekleme listesi nasıl çalışıyor

Sayfadaki iki "Bekleme listesine katıl" butonu bir Google formuna gider. Kayıtlar
senin Google hesabındaki o formda birikir.

- **Kayıtları görmek:** [forms.google.com](https://forms.google.com) → "Halleder bekleme listesi" → **Yanıtlar** sekmesi.
  Yeşil Sheets simgesine basarsan e-postalar tabloda görünür.
- **Kayıtları durdurmak:** **Yanıtlar** sekmesinde "Yanıt kabul ediliyor" düğmesini kapat.
- **Formun linkini değiştirmek:** `index.html` içinde `docs.google.com/forms` ara. İki yerde var.
- **Yedek al:** Liste Google hesabında durur. Zaman zaman Sheets'ten bir kopya indir.

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
- Sayfanın altındaki gizlilik cümlesi, insanların listeden çıkabileceğini vaat ediyor.
  Sadece bunu gerçekten yapacaksan bırak.
- Türkiye'de e-posta adresi toplamak kişisel veri toplamak sayılır (KVKK). Gerçek
  kayıt almaya başlamadan önce bir büyükle birlikte bir aydınlatma metni hazırlamak iyi olur.
