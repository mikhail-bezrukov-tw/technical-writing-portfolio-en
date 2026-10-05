from pathlib import Path
import tempfile

import fitz  # PyMuPDF
from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "static" / "mikhail-bezrukov-cv.pdf"
PORTFOLIO_URL = "https://mikhail-bezrukov-tw.github.io/technical-writing-portfolio-en/"


def extract_existing_photo(source_pdf: Path, output_path: Path) -> None:
    """Extract the largest near-square raster image from the existing CV.

    The repository already contains the approved portrait inside the current PDF.
    We reuse that exact image so no separate personal-photo asset is needed.
    """
    doc = fitz.open(source_pdf)
    candidates = []
    seen = set()
    for page in doc:
        for img in page.get_images(full=True):
            xref = img[0]
            if xref in seen:
                continue
            seen.add(xref)
            meta = doc.extract_image(xref)
            width = int(meta.get("width") or 0)
            height = int(meta.get("height") or 0)
            if width <= 0 or height <= 0:
                continue
            ratio = width / height
            area = width * height
            score = area if 0.70 <= ratio <= 1.35 else area * 0.10
            candidates.append((score, area, meta["image"]))
    doc.close()

    if not candidates:
        raise RuntimeError("Could not find a portrait image in the existing CV PDF")

    candidates.sort(reverse=True, key=lambda x: (x[0], x[1]))
    output_path.write_bytes(candidates[0][2])


def draw_cv(photo_path: Path, out_path: Path) -> None:
    W, H = letter
    c = canvas.Canvas(str(out_path), pagesize=letter)
    c.setTitle("Mikhail Bezrukov - Senior Technical Writer")
    c.setAuthor("Mikhail Bezrukov")

    NAVY = colors.HexColor("#27313D")
    BLUE = colors.HexColor("#2D6685")
    LIGHT = colors.HexColor("#EEF4F7")
    LINE = colors.HexColor("#C9D2D8")
    GRAY = colors.HexColor("#606A73")
    TEXT = colors.HexColor("#2E353B")

    LM = 18
    RM = 18
    TOP = 18
    right = W - RM

    def draw_text(text, x, y, size=8.2, font="Helvetica", color=TEXT):
        c.setFillColor(color)
        c.setFont(font, size)
        c.drawString(x, y, text)

    def draw_link(text, url, x, y, size=8.2, font="Helvetica", color=BLUE, underline=True):
        c.setFillColor(color)
        c.setFont(font, size)
        c.drawString(x, y, text)
        w = stringWidth(text, font, size)
        if underline:
            c.setStrokeColor(color)
            c.setLineWidth(0.35)
            c.line(x, y - 1.2, x + w, y - 1.2)
        c.linkURL(url, (x, y - 2, x + w, y + size + 1), relative=0)
        return x + w

    def section(title, x, y, w):
        c.setFillColor(BLUE)
        c.roundRect(x, y - 1.5, 3, 8, 1.5, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(x + 8, y, title)
        return y - 14

    def para(text, x, y, w, size=8.2, leading=10.4, font="Helvetica", color=TEXT):
        c.setFillColor(color)
        c.setFont(font, size)
        lines = simpleSplit(text, font, size, w)
        for line in lines:
            c.drawString(x, y, line)
            y -= leading
        return y

    def bullet(text, x, y, w, size=8.0, leading=10.1, bullet_indent=9):
        lines = simpleSplit(text, "Helvetica", size, w - bullet_indent)
        c.setFillColor(TEXT)
        c.setFont("Helvetica", size)
        c.drawString(x, y, "•")
        for line in lines:
            c.drawString(x + bullet_indent, y, line)
            y -= leading
        return y - 1.5

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 21.5)
    c.drawString(LM, H - TOP - 8, "Mikhail Bezrukov")

    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 10.3)
    c.drawString(LM, H - TOP - 25, "SENIOR TECHNICAL WRITER")

    c.setFillColor(TEXT)
    c.setFont("Helvetica", 8.5)
    c.drawString(LM, H - TOP - 41, "Product documentation owner  ·  Docs-as-code practitioner  ·  Advanced AI user")

    px, py, pw, ph = W - 103, H - 90, 83, 72
    with Image.open(photo_path) as src:
        im = src.convert("RGB")
        target_ratio = pw / ph
        w0, h0 = im.size
        ratio = w0 / h0
        if ratio > target_ratio:
            new_w = int(h0 * target_ratio)
            left = (w0 - new_w) // 2
            im = im.crop((left, 0, left + new_w, h0))
        elif ratio < target_ratio:
            new_h = int(w0 / target_ratio)
            top = (h0 - new_h) // 2
            im = im.crop((0, top, w0, top + new_h))
        crop_path = photo_path.with_name("cv-photo-crop.jpg")
        im.save(crop_path, quality=94)

    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.roundRect(px, py, pw, ph, 5, fill=0, stroke=1)
    c.drawImage(str(crop_path), px + 0.7, py + 0.7, width=pw - 1.4, height=ph - 1.4, mask="auto")

    y = H - TOP - 57
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 7.8)
    c.drawString(LM, y, "Open to relocation to Spain  ·  ")
    x = LM + stringWidth("Open to relocation to Spain  ·  ", "Helvetica", 7.8)
    x = draw_link("Snail7070@gmail.com", "mailto:Snail7070@gmail.com", x, y, 7.8, underline=False)
    draw_text("  ·  ", x, y, 7.8, color=GRAY)
    x += stringWidth("  ·  ", "Helvetica", 7.8)
    x = draw_link("@el_miguel", "https://t.me/el_miguel", x, y, 7.8, underline=False)
    draw_text("  ·  ", x, y, 7.8, color=GRAY)
    x += stringWidth("  ·  ", "Helvetica", 7.8)
    draw_link("Telegram channel", "https://t.me/mishka_v_kurse", x, y, 7.8, underline=False)

    bar_y = H - TOP - 82
    bar_h = 19
    bar_w = W - LM - RM - 95
    c.setFillColor(LIGHT)
    c.setStrokeColor(colors.HexColor("#B9CDD8"))
    c.setLineWidth(0.65)
    c.roundRect(LM, bar_y, bar_w, bar_h, 4, fill=1, stroke=1)
    label = "VIEW PORTFOLIO"
    sub = "Documentation Samples & Case Studies"
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 8.4)
    c.drawString(LM + 9, bar_y + 6.4, label)
    x2 = LM + 9 + stringWidth(label, "Helvetica-Bold", 8.4) + 8
    c.setFillColor(TEXT)
    c.setFont("Helvetica", 8.2)
    c.drawString(x2, bar_y + 6.4, sub + "  >")
    c.linkURL(PORTFOLIO_URL, (LM, bar_y, LM + bar_w, bar_y + bar_h), relative=0)

    sep_y = bar_y - 11
    c.setStrokeColor(BLUE)
    c.setLineWidth(0.9)
    c.line(LM, sep_y, right, sep_y)

    sy = sep_y - 22
    sy = section("PROFILE", LM, sy, right - LM)
    profile = (
        "Senior Technical Writer with nearly 4 years of experience owning customer-facing product documentation for U.S. "
        "healthcare IT software. I turn complex product behavior into clear user guidance, working with Product, Engineering, "
        "QA, and domain experts from research through publication and maintenance. I am an advanced user of AI tools for "
        "documentation work, using them to support research, editorial QA, screenshot workflows, and reusable documentation "
        "processes without losing human judgment."
    )
    sy = para(profile, LM, sy, right - LM, 8.05, 9.7)
    sy -= 4
    c.setStrokeColor(LINE)
    c.setLineWidth(0.55)
    c.line(LM, sy, right, sy)

    sy -= 17
    sy = section("AI WORKFLOWS", LM, sy, right - LM)
    c.setFont("Helvetica-Bold", 8.1)
    c.setFillColor(TEXT)
    c.drawString(LM, sy, "Advanced user of:")
    for item in ["Claude & Claude Code", "ChatGPT", "Gemini", "Cursor"]:
        sy -= 10
        draw_text(item, LM, sy, 8.0)

    ai2x = LM + 225
    ai2y = sy + 40
    c.setFont("Helvetica-Bold", 8.1)
    c.setFillColor(TEXT)
    c.drawString(ai2x, ai2y, "Workflow design:")
    para(
        "Create reusable skills and workflows for documentation drafting, editorial QA, screenshot preparation, UX copy, and maintenance tasks.",
        ai2x,
        ai2y - 10,
        right - ai2x,
        8.0,
        9.4,
    )
    line_y = sy - 12
    c.setStrokeColor(LINE)
    c.line(LM, line_y, right, line_y)

    lower_top = line_y - 20
    main_x = LM
    sidebar_x = 411
    main_w = sidebar_x - main_x - 14
    side_w = right - sidebar_x
    c.setStrokeColor(colors.HexColor("#D6DDE1"))
    c.setLineWidth(0.5)
    c.line(sidebar_x - 8, lower_top + 7, sidebar_x - 8, 43)

    my = section("EXPERIENCE", main_x, lower_top, main_w)
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 10.2)
    c.drawString(main_x, my, "Sxope - Senior Technical Writer")
    my -= 11
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 7.7)
    c.drawString(main_x, my, "Nov 2022 - Present  ·  Remote")
    my -= 13
    bullets = [
        "Own end-user and internal documentation for 8 healthcare IT services, maintaining 200+ Knowledge Base articles from source research and verification through publication and maintenance.",
        "Turn product and engineering input into clear user-facing documentation and release notes, supporting release communication across 18 services and collaborating with Product, Engineering, QA, analysts, and domain experts.",
        "Build reusable Claude / Claude Code skills and AI-assisted workflows for drafting, editorial QA, UX copy, screenshot preparation, and documentation maintenance.",
        "Work in a Git / Markdown / Docusaurus docs-as-code environment, using Python utilities for documentation QA and visual workflows and Swagger / OpenAPI materials for API and integration concepts.",
    ]
    for b in bullets:
        my = bullet(b, main_x, my, main_w, 7.65, 9.2)

    my -= 4
    my = section("SELECTED STRENGTHS", main_x, my, main_w)
    for b in [
        "Documentation ownership: from source discovery and validation to publication and ongoing maintenance.",
        "Visual documentation: screenshots, structured UI explanation, and context-aware help content.",
        "Documentation engineering: docs-as-code workflows, documentation QA, and small Python-based tooling.",
    ]:
        my = bullet(b, main_x, my, main_w, 7.55, 9.1)

    sy2 = section("CORE SKILLS", sidebar_x, lower_top, side_w)
    for item in [
        "Product & technical documentation",
        "Knowledge Base ownership",
        "Release communication",
        "UX writing",
        "Information architecture",
        "API documentation",
    ]:
        draw_text(item, sidebar_x, sy2, 7.75)
        sy2 -= 9.2

    sy2 -= 2
    sy2 = section("TOOLS", sidebar_x, sy2, side_w)
    sy2 = para(
        "Git · Markdown · Docusaurus · Python · Swagger/OpenAPI · Jira · Confluence · Figma · Snagit · Claude · Cursor · ChatGPT",
        sidebar_x,
        sy2,
        side_w,
        7.65,
        9.0,
    )

    sy2 -= 3
    sy2 = section("LANGUAGES", sidebar_x, sy2, side_w)
    for item in [
        "Russian: native",
        "English: C1 / full professional proficiency",
        "Spanish: professional proficiency",
    ]:
        sy2 = para(item, sidebar_x, sy2, side_w, 7.65, 8.9)
        sy2 -= 0.5

    sy2 -= 2
    sy2 = section("EDUCATION", sidebar_x, sy2, side_w)
    sy2 = para("Moscow State Linguistic University", sidebar_x, sy2, side_w, 7.65, 8.8)
    sy2 = para("Bachelor's Degree, Translation and Interpreting (2016)", sidebar_x, sy2, side_w, 7.65, 8.8)

    sy2 -= 3
    sy2 = section("ADDITIONAL", sidebar_x, sy2, side_w)
    sy2 = para(
        "Author of a Russian-language Telegram channel on technical writing, documentation workflows, and AI-assisted documentation.",
        sidebar_x,
        sy2,
        side_w,
        7.55,
        8.7,
    )
    sy2 -= 2
    draw_link("Telegram channel", "https://t.me/mishka_v_kurse", sidebar_x, sy2, 7.55)
    sy2 -= 13
    para("Practical API Documentation course (2023).", sidebar_x, sy2, side_w, 7.55, 8.7)

    c.save()


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    if not OUT.exists():
        raise FileNotFoundError(f"Existing CV not found: {OUT}")

    with tempfile.TemporaryDirectory(prefix="cv-build-") as tmp:
        tmpdir = Path(tmp)
        portrait = tmpdir / "portrait"
        extract_existing_photo(OUT, portrait)
        generated = tmpdir / "mikhail-bezrukov-cv.pdf"
        draw_cv(portrait, generated)
        generated.replace(OUT)

    print(f"Generated {OUT}")


if __name__ == "__main__":
    main()
