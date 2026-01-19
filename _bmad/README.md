# BMAD Framework - Invenex Website

**BMAD** (Brain Model for Adaptive Development) is an AI-assisted development methodology that uses specialized agents for different aspects of the software development lifecycle.

## Available Agents

| Agent | Command | Description |
|-------|---------|-------------|
| TEA | `/bmad:bmm:agents:tea` | Test Engineering Architect |
| DEV | `/bmad:bmm:agents:dev` | Developer Agent |
| PM | `/bmad:bmm:agents:pm` | Product Manager |

## Project Structure

```
_bmad/
├── bmm/
│   ├── agents/          # Agent definitions
│   │   ├── tea.md       # Test Engineering Architect
│   │   ├── dev.md       # Developer
│   │   └── pm.md        # Product Manager
│   ├── workflows/       # Workflow definitions
│   ├── tasks/           # Task templates
│   ├── templates/       # Document templates
│   ├── checklists/      # QA checklists
│   ├── personas/        # User personas
│   └── data/            # Project data
└── README.md
```

## Usage

Invoke an agent using the skill command:
```
/bmad:bmm:agents:tea     # Start TEA agent
/bmad:bmm:agents:dev     # Start DEV agent
/bmad:bmm:agents:pm      # Start PM agent
```

## Current Project Status

### Testing (TEA)
- **Framework**: Playwright
- **Tests**: 36 passing
- **Coverage**: Homepage (Story 3-1) fully tested
- **Live Site**: https://invenexsolutions.vercel.app

### Development (DEV)
- **Stack**: Next.js 16.1.3, React 19, Tailwind CSS v4
- **Sections**: Hero, Services, Portfolio, Products, WordPress Plugins, Why Choose Us, Instagram Reels, Testimonials, Client Logos, CTA
- **Status**: Story 3-1 Complete ✅
