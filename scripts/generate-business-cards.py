"""
Print-ready A4 business cards (front + back) for Sami-Severi Sjöberg.

Card size: 85 × 55 mm (EU standard)
Layout: 2 × 5 = 10 cards per A4 side
Duplex: long-edge flip (back page columns are mirrored)

Output: assets/documents/Business-Cards_Sami-Severi-Sjoberg.pdf
"""
from pathlib import Path

import qrcode
from fpdf import FPDF
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "documents" / "Business-Cards_Sami-Severi-Sjoberg.pdf"
QR_PATH = ROOT / "assets" / "documents" / "_bizcard-qr.png"
PHOTO_PATH = ROOT / "assets" / "documents" / "_bizcard-photo.png"
PROFILE = ROOT / "assets" / "images" / "profile.jpg"
FONTS = Path(r"C:\Windows\Fonts")

SITE = "https://sami-severi.fi"
NAME = "Sami-Severi Sjöberg"
TITLE = "Full Stack Engineer"
SUBTITLE = "ICT Engineering Student"
EMAIL = "samiseveri.sjoberg@gmail.com"
PHONE = "+358 44 010 1160"
LOCATION = "Turku, Finland"

# Brand colors (portfolio)
ACCENT = (99, 102, 241)  # #6366f1
ACCENT2 = (34, 211, 238)  # #22d3ee
DARK = (9, 9, 11)  # #09090b
DARK2 = (17, 17, 19)
TEXT = (250, 250, 250)
MUTED = (161, 161, 170)

CARD_W = 85.0
CARD_H = 55.0
COLS = 2
ROWS = 5
# Centered grid on A4
PAGE_W = 210.0
PAGE_H = 297.0
GAP_X = 4.0
GAP_Y = 4.0
GRID_W = COLS * CARD_W + (COLS - 1) * GAP_X
GRID_H = ROWS * CARD_H + (ROWS - 1) * GAP_Y
ORIGIN_X = (PAGE_W - GRID_W) / 2
ORIGIN_Y = (PAGE_H - GRID_H) / 2


def make_qr(path: Path) -> None:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=12,
        border=1,
    )
    qr.add_data(SITE)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#09090b", back_color="#ffffff").convert("RGB")
    img.save(path)


def make_photo(path: Path, size: int = 320) -> None:
    """Circular profile photo with a thin accent ring."""
    img = Image.open(PROFILE).convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, (h - side) // 2 - side // 12)  # slight upward bias for faces
    img = img.crop((left, top, left + side, min(top + side, h))).resize((size, size), Image.Resampling.LANCZOS)

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)

    # Soft accent ring behind the photo
    ring = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    pad = max(2, size // 40)
    for i, color in enumerate((ACCENT, ACCENT2)):
        inset = i
        rd.ellipse((inset, inset, size - 1 - inset, size - 1 - inset), outline=(*color, 255), width=pad)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.alpha_composite(ring)
    face = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    face.paste(img, (0, 0), mask=mask)
    # Keep ring visible: slightly smaller face
    shrink = pad + 1
    face = face.resize((size - shrink * 2, size - shrink * 2), Image.Resampling.LANCZOS)
    out.paste(face, (shrink, shrink), mask=face.split()[-1])
    out.save(path)


class Cards(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=False)
        self.add_font("Body", "", str(FONTS / "calibri.ttf"))
        self.add_font("Body", "B", str(FONTS / "calibrib.ttf"))
        self.add_font("Body", "I", str(FONTS / "calibrii.ttf"))

    def card_origin(self, col: int, row: int, mirror: bool = False) -> tuple[float, float]:
        c = (COLS - 1 - col) if mirror else col
        x = ORIGIN_X + c * (CARD_W + GAP_X)
        y = ORIGIN_Y + row * (CARD_H + GAP_Y)
        return x, y

    def crop_marks(self, x: float, y: float):
        self.set_draw_color(120, 120, 120)
        self.set_line_width(0.15)
        m = 2.5
        # corners
        for cx, cy, dx1, dy1, dx2, dy2 in [
            (x, y, -m, 0, 0, -m),
            (x + CARD_W, y, m, 0, 0, -m),
            (x, y + CARD_H, -m, 0, 0, m),
            (x + CARD_W, y + CARD_H, m, 0, 0, m),
        ]:
            self.line(cx, cy, cx + dx1, cy + dy1)
            self.line(cx, cy, cx + dx2, cy + dy2)

    def draw_front(self, x: float, y: float):
        # Background
        self.set_fill_color(*DARK)
        self.rect(x, y, CARD_W, CARD_H, "F")
        # Accent bar top
        self.set_fill_color(*ACCENT)
        self.rect(x, y, CARD_W, 1.2, "F")
        self.set_fill_color(*ACCENT2)
        self.rect(x, y + 1.2, CARD_W, 0.5, "F")

        # Profile photo
        if PHOTO_PATH.exists():
            self.image(str(PHOTO_PATH), x=x + 5.5, y=y + 9, w=15.5)

        # Name + titles
        self.set_xy(x + 24, y + 11)
        self.set_font("Body", "B", 13)
        self.set_text_color(*TEXT)
        self.cell(55, 6, NAME)

        self.set_xy(x + 24, y + 18)
        self.set_font("Body", "", 9)
        self.set_text_color(*ACCENT2)
        self.cell(55, 4.5, TITLE)

        self.set_xy(x + 24, y + 23)
        self.set_font("Body", "", 8)
        self.set_text_color(*MUTED)
        self.cell(55, 4, SUBTITLE)

        # Divider
        self.set_draw_color(60, 60, 70)
        self.set_line_width(0.3)
        self.line(x + 6, y + 36, x + CARD_W - 6, y + 36)

        # Website
        self.set_xy(x + 6, y + 39)
        self.set_font("Body", "B", 9)
        self.set_text_color(*TEXT)
        self.cell(CARD_W - 12, 5, "sami-severi.fi")

        self.set_xy(x + 6, y + 44.5)
        self.set_font("Body", "", 7.5)
        self.set_text_color(*MUTED)
        self.cell(CARD_W - 12, 4, LOCATION)

        # Thin border for cut guide (inside edge)
        self.set_draw_color(40, 40, 48)
        self.set_line_width(0.2)
        self.rect(x, y, CARD_W, CARD_H)

    def draw_back(self, x: float, y: float):
        # Light back for easier home printing + QR contrast
        self.set_fill_color(252, 252, 253)
        self.rect(x, y, CARD_W, CARD_H, "F")
        # Left accent strip
        self.set_fill_color(*ACCENT)
        self.rect(x, y, 3, CARD_H, "F")
        self.set_fill_color(*ACCENT2)
        self.rect(x + 3, y, 0.8, CARD_H, "F")

        # QR
        qr_size = 28
        qr_x = x + 8
        qr_y = y + (CARD_H - qr_size) / 2
        if QR_PATH.exists():
            self.image(str(QR_PATH), x=qr_x, y=qr_y, w=qr_size)

        # Contact block
        tx = x + 40
        self.set_xy(tx, y + 10)
        self.set_font("Body", "B", 9)
        self.set_text_color(*DARK)
        self.cell(40, 4.5, "Let's connect")

        self.set_xy(tx, y + 16)
        self.set_font("Body", "", 7.5)
        self.set_text_color(80, 80, 90)
        self.cell(40, 3.8, "Scan for portfolio")

        self.set_draw_color(220, 220, 228)
        self.set_line_width(0.25)
        self.line(tx, y + 22, x + CARD_W - 5, y + 22)

        self.set_font("Body", "", 7.5)
        self.set_text_color(*DARK)
        lines = [
            ("Web", "sami-severi.fi"),
            ("Email", EMAIL),
            ("Phone", PHONE),
            ("GitHub", "github.com/samiseveri"),
        ]
        yy = y + 25
        for label, value in lines:
            self.set_xy(tx, yy)
            self.set_font("Body", "B", 6.5)
            self.set_text_color(*ACCENT)
            self.cell(40, 3, label.upper())
            self.set_xy(tx, yy + 2.8)
            self.set_font("Body", "", 7.2)
            self.set_text_color(*DARK)
            self.cell(40, 3.2, value)
            yy += 7

        self.set_draw_color(200, 200, 210)
        self.set_line_width(0.2)
        self.rect(x, y, CARD_W, CARD_H)

    def instruction_banner(self, text: str):
        self.set_fill_color(245, 245, 248)
        self.rect(0, 0, PAGE_W, 8, "F")
        self.set_xy(10, 1.5)
        self.set_font("Body", "", 8)
        self.set_text_color(80, 80, 90)
        self.cell(PAGE_W - 20, 5, text, align="C")

    def build(self):
        # Page 1 — fronts
        self.add_page()
        self.instruction_banner(
            "FRONT  ·  Print double-sided, flip on LONG edge  ·  Cut on crop marks  ·  Card size 85×55 mm"
        )
        for row in range(ROWS):
            for col in range(COLS):
                x, y = self.card_origin(col, row, mirror=False)
                self.draw_front(x, y)
                self.crop_marks(x, y)

        # Page 2 — backs (mirrored columns for long-edge duplex)
        self.add_page()
        self.instruction_banner(
            "BACK  ·  Same paper, long-edge flip  ·  Columns are mirrored to align with fronts when duplexing"
        )
        for row in range(ROWS):
            for col in range(COLS):
                x, y = self.card_origin(col, row, mirror=True)
                self.draw_back(x, y)
                self.crop_marks(x, y)


def main():
    make_qr(QR_PATH)
    make_photo(PHOTO_PATH)
    pdf = Cards()
    pdf.build()
    pdf.output(str(OUT))
    print("wrote", OUT)
    for p in (QR_PATH, PHOTO_PATH):
        if p.exists():
            p.unlink()


if __name__ == "__main__":
    main()
