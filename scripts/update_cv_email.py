from pathlib import Path
import fitz

PDF = Path(__file__).resolve().parents[1] / "static" / "mikhail-bezrukov-cv.pdf"
OLD = "Snail7070@gmail.com"
NEW = "mikhail.bezrukov.tw@gmail.com"

doc = fitz.open(PDF)
page = doc[0]
text = page.get_text()

if NEW in text and OLD not in text:
    print("CV email already updated")
    doc.close()
    raise SystemExit(0)

if OLD not in text:
    doc.close()
    raise RuntimeError("Old email not found in CV")

# Remove the three contact-row links; their positions change when the email gets longer.
for link in list(page.get_links()):
    rect = link.get("from")
    if rect and 63 <= rect.y0 <= 80:
        page.delete_link(link)

# Replace only the contact row, preserving the rest of the PDF exactly.
page.add_redact_annot(fitz.Rect(17, 63.5, 360, 79.5), fill=(1, 1, 1))
page.apply_redactions()

GRAY = (96 / 255, 106 / 255, 115 / 255)
BLUE = (45 / 255, 102 / 255, 133 / 255)
FS = 7.8
BASELINE = 75.0
x = 18.0

def add(text, color, uri=None):
    global x
    page.insert_text((x, BASELINE), text, fontsize=FS, fontname="helv", color=color, overlay=True)
    width = fitz.get_text_length(text, fontname="helv", fontsize=FS)
    if uri:
        page.insert_link({
            "kind": fitz.LINK_URI,
            "from": fitz.Rect(x, 66.2, x + width, 77.2),
            "uri": uri,
        })
    x += width

add("Open to relocation to Spain  ·  ", GRAY)
add(NEW, BLUE, "mailto:" + NEW)
add("  ·  ", GRAY)
add("@el_miguel", BLUE, "https://t.me/el_miguel")
add("  ·  ", GRAY)
add("Telegram channel", BLUE, "https://t.me/mishka_v_kurse")

tmp = PDF.with_suffix(".tmp.pdf")
doc.save(tmp, garbage=4, deflate=True)
doc.close()
tmp.replace(PDF)
print(f"Updated {PDF}")
