"""Generate an updated one-page EN CV for Sami-Severi Sjöberg."""
from pathlib import Path

from fpdf import FPDF
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "documents" / "CV_Sami-Severi Sjöberg (EN).pdf"
BACKUP = ROOT / "assets" / "documents" / "CV_Sami-Severi Sjöberg (EN).backup.pdf"
PROFILE = ROOT / "assets" / "images" / "profile.jpg"
PROFILE_CIRCLE = ROOT / "assets" / "documents" / "_profile-circle.png"

FONTS = Path(r"C:\Windows\Fonts")
SIDEBAR = (36, 48, 66)  # dark slate-blue
ACCENT = (90, 120, 180)
TEXT = (35, 40, 50)
MUTED = (90, 98, 110)
WHITE = (255, 255, 255)
LIGHT = (245, 247, 250)
LINE = (210, 216, 224)


def make_circle_avatar(src: Path, dest: Path, size: int = 280) -> None:
    img = Image.open(src).convert("RGBA")
    # Center-crop square
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side)).resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask=mask)
    # Soft ring
    draw = ImageDraw.Draw(out)
    draw.ellipse((2, 2, size - 3, size - 3), outline=(255, 255, 255, 220), width=4)
    out.save(dest)


class CV(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=False)
        self.add_font("Body", "", str(FONTS / "calibri.ttf"))
        self.add_font("Body", "B", str(FONTS / "calibrib.ttf"))
        self.add_font("Body", "I", str(FONTS / "calibrii.ttf"))
        self.sidebar_w = 62
        self.margin_r = 12
        self.margin_l_main = self.sidebar_w + 10
        self.content_w = 210 - self.margin_l_main - self.margin_r

    def draw_sidebar(self):
        self.set_fill_color(*SIDEBAR)
        self.rect(0, 0, self.sidebar_w, 297, "F")

        # Avatar
        if PROFILE_CIRCLE.exists():
            self.image(str(PROFILE_CIRCLE), x=11, y=12, w=40)

        y = 58
        self.sidebar_heading("Contact", y)
        y += 7
        y = self.sidebar_field("Phone", "+358 44 010 1160", y)
        y = self.sidebar_field("Email", "samiseveri.sjoberg@gmail.com", y)
        y += 4

        self.sidebar_heading("Education", y)
        y += 7
        y = self.sidebar_edu(
            "2023 — Ongoing",
            "ICT Engineering",
            "Software engineering & project management",
            "TUAS (Turku UAS)",
            y,
        )
        y = self.sidebar_edu(
            "2019 — 2022",
            "Information and Communications Technology",
            "Specialized in software development",
            "TAI Juhannuskukkula",
            y,
        )
        y = self.sidebar_edu(
            "2022 — 2023",
            "Ship's cook",
            "Restaurant & catering basics",
            "Raseko / Finnish Navy",
            y,
        )
        y += 2

        self.sidebar_heading("Expertise", y)
        y += 6.5
        for skill in [
            "Full-stack development",
            "JavaScript / TypeScript",
            "Project management",
            "SQL & databases",
            "WordPress",
            "Software design",
            "Interactive mockups (Figma)",
            "Linux / Raspberry Pi",
        ]:
            y = self.sidebar_bullet(skill, y)
        y += 3

        self.sidebar_heading("Languages", y)
        y += 6.5
        y = self.sidebar_bullet("Finnish — native", y)
        y = self.sidebar_bullet("English — fluent", y)

    def sidebar_heading(self, text, y):
        self.set_xy(8, y)
        self.set_font("Body", "B", 11)
        self.set_text_color(*WHITE)
        self.cell(self.sidebar_w - 16, 5, text.upper())
        # underline
        self.set_draw_color(120, 140, 180)
        self.set_line_width(0.4)
        self.line(8, y + 5.5, self.sidebar_w - 8, y + 5.5)

    def sidebar_field(self, label, value, y):
        self.set_xy(8, y)
        self.set_font("Body", "B", 8)
        self.set_text_color(170, 185, 210)
        self.cell(self.sidebar_w - 16, 4, label)
        self.set_xy(8, y + 3.6)
        self.set_font("Body", "", 8.5)
        self.set_text_color(*WHITE)
        self.multi_cell(self.sidebar_w - 16, 4, value)
        return self.get_y() + 2.5

    def sidebar_edu(self, dates, title, detail, school, y):
        self.set_xy(8, y)
        self.set_font("Body", "B", 7.5)
        self.set_text_color(150, 175, 210)
        self.cell(self.sidebar_w - 16, 3.5, dates)
        self.set_xy(8, y + 3.4)
        self.set_font("Body", "B", 8.5)
        self.set_text_color(*WHITE)
        self.multi_cell(self.sidebar_w - 16, 3.6, title)
        y2 = self.get_y()
        self.set_xy(8, y2)
        self.set_font("Body", "", 7.5)
        self.set_text_color(200, 210, 225)
        self.multi_cell(self.sidebar_w - 16, 3.3, detail)
        y3 = self.get_y()
        self.set_xy(8, y3)
        self.set_font("Body", "I", 7.5)
        self.multi_cell(self.sidebar_w - 16, 3.3, school)
        return self.get_y() + 3.2

    def sidebar_bullet(self, text, y):
        self.set_xy(8, y)
        self.set_font("Body", "", 8.5)
        self.set_text_color(*WHITE)
        self.cell(3, 4, "•")
        self.set_xy(12, y)
        self.multi_cell(self.sidebar_w - 20, 4, text)
        return self.get_y() + 0.8

    def section_title(self, text, y):
        self.set_xy(self.margin_l_main, y)
        self.set_font("Body", "B", 13)
        self.set_text_color(*TEXT)
        self.cell(self.content_w, 6, text)
        self.set_draw_color(*LINE)
        self.set_line_width(0.5)
        self.line(self.margin_l_main, y + 7, 210 - self.margin_r, y + 7)
        return y + 10

    def job(self, dates, role, company, bullets, y, markers=None):
        # Date column
        self.set_xy(self.margin_l_main, y)
        self.set_font("Body", "B", 8)
        self.set_text_color(*ACCENT)
        self.cell(28, 4, dates)

        cx = self.margin_l_main + 30
        if markers is not None:
            markers.append(y + 0.7)

        # Role + company
        self.set_xy(cx + 4, y)
        self.set_font("Body", "B", 10.5)
        self.set_text_color(*TEXT)
        self.cell(self.content_w - 36, 4.2, role)
        self.set_xy(cx + 4, y + 4.2)
        self.set_font("Body", "", 8.5)
        self.set_text_color(*MUTED)
        self.cell(self.content_w - 36, 3.8, company)

        y2 = y + 9
        self.set_font("Body", "", 8.7)
        self.set_text_color(*TEXT)
        for b in bullets:
            self.set_xy(cx + 4, y2)
            self.set_text_color(*ACCENT)
            self.cell(3, 3.6, "•")
            self.set_text_color(*TEXT)
            self.set_xy(cx + 7, y2)
            self.multi_cell(self.content_w - 39, 3.6, b)
            y2 = self.get_y() + 0.4
        return y2 + 2.8

    def cert(self, title, detail, y):
        self.set_fill_color(*ACCENT)
        self.ellipse(self.margin_l_main + 0.2, y + 1.2, 2.2, 2.2, "F")
        self.set_xy(self.margin_l_main + 5, y)
        self.set_font("Body", "B", 9.5)
        self.set_text_color(*TEXT)
        self.cell(self.content_w - 5, 4, title)
        self.set_xy(self.margin_l_main + 5, y + 4)
        self.set_font("Body", "", 8.5)
        self.set_text_color(*MUTED)
        self.multi_cell(self.content_w - 5, 3.6, detail)
        return self.get_y() + 2.2

    def build(self):
        self.add_page()
        self.draw_sidebar()

        # Header
        y = 14
        self.set_xy(self.margin_l_main, y)
        self.set_font("Body", "B", 24)
        self.set_text_color(*TEXT)
        self.cell(self.content_w, 9, "Sami-Severi Sjöberg")

        self.set_xy(self.margin_l_main, y + 10)
        self.set_font("Body", "", 12)
        self.set_text_color(*ACCENT)
        self.cell(self.content_w, 6, "Full Stack Engineer & ICT Engineering Student")

        # Summary
        summary = (
            "ICT Engineering student at Turku University of Applied Sciences, specializing in "
            "software engineering and project management. Nearly seven years across software, "
            "hardware, and game production — including a full-stack internship building a "
            "Raspberry Pi digital signage platform, hackathons, game jams, and client web work."
        )
        self.set_xy(self.margin_l_main, y + 18)
        self.set_font("Body", "", 9.5)
        self.set_text_color(*TEXT)
        self.multi_cell(self.content_w, 4.2, summary)
        y = self.get_y() + 5

        # Experience
        y = self.section_title("Experience", y)
        markers = []
        jobs_start = y
        y = self.job(
            "05/2025 — 08/2026",
            "Full Stack Engineer Intern",
            "Bittera Oy",
            [
                "Built a web platform for centralized digital signage management on Raspberry Pi devices.",
                "Implemented remote media uploads, playlist scheduling, device monitoring, and maintenance features.",
                "Collaborated on full-stack architecture; thesis continues on localized software.",
            ],
            y,
            markers,
        )
        y = self.job(
            "06/2024 — 08/2024",
            "Creative Director",
            "StuDisco / Studisco Oy",
            [
                "Directed creative vision across game and media production projects.",
                "Coordinated design workflows, production schedules, and team collaboration.",
            ],
            y,
            markers,
        )
        y = self.job(
            "2022 — 2024",
            "Game Production Lead & Lead Designer",
            "Studisco Games",
            [
                "Oversaw game production direction, design planning, team scheduling, and project meetings.",
            ],
            y,
            markers,
        )
        y = self.job(
            "2022 — 2023",
            "Ship's Cook",
            "Finnish Navy & Viking Line",
            [
                "Earned ship’s cook certification in the navy; continued aboard a Viking Line vessel.",
                "Recognized as Best Ship’s Cook of the 2/22 intake.",
            ],
            y,
            markers,
        )
        y = self.job(
            "Summers 2019 — 2021",
            "Computer Technician",
            "Jimm's PC-Store Oy",
            [
                "Assembled custom PCs, updated BIOS firmware, and performed QA — over 1,000 builds.",
            ],
            y,
            markers,
        )

        # Timeline under content, markers on top
        cx = self.margin_l_main + 30
        self.set_draw_color(*LINE)
        self.set_line_width(0.55)
        if markers:
            self.line(cx, markers[0] + 1, cx, markers[-1] + 1)
        self.set_fill_color(*ACCENT)
        for my in markers:
            self.ellipse(cx - 1.15, my, 2.3, 2.3, "F")

        # Certifications
        y = self.section_title("Certifications", y)
        y = self.cert(
            "Student mentor",
            "Peer tutor trained in peer mentoring, media literacy, and substance abuse awareness.",
            y,
        )
        y = self.cert("EA1 / First Aid", "First aid training completed during military service (Finnish Red Cross).", y)
        y = self.cert("Food Hygiene Certificate", "Completed during ship’s cook training (Finnish Food Authority).", y)
        y = self.cert(
            "Security Awareness (GSPA)",
            "GIAC Security Policy and Awareness training focused on security risks and protocols (Traficom).",
            y,
        )

        # Hobbies
        y = self.section_title("Hobbies", y)
        self.set_xy(self.margin_l_main, y)
        self.set_font("Body", "", 9.5)
        self.set_text_color(*TEXT)
        self.multi_cell(
            self.content_w,
            4.2,
            "Sabre fencing, gaming, hardware & tech projects, cooking, nature, and voluntary work.",
        )


def main():
    if OUT.exists() and not BACKUP.exists():
        BACKUP.write_bytes(OUT.read_bytes())
        print("backed up to", BACKUP.name)

    make_circle_avatar(PROFILE, PROFILE_CIRCLE)
    pdf = CV()
    pdf.build()
    pdf.output(str(OUT))
    print("wrote", OUT)

    # Preview
    import pypdfium2 as pdfium

    doc = pdfium.PdfDocument(str(OUT))
    img = doc[0].render(scale=2).to_pil()
    preview = ROOT / "assets" / "documents" / "_cv-preview.png"
    img.save(preview)
    print("preview", preview, img.size)


if __name__ == "__main__":
    main()
