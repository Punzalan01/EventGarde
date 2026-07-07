# EventGarde

EventGarde is an integrated event management platform that connects event organizers, attendees, and marketplace vendors in one system. It combines event creation, RSVP tracking, public ticketing, QR-based event-day access, vendor discovery, vendor negotiation, vendor booking, and payment-gated calendar locking.

The platform follows one strict rule: free Personal Workspace users can browse events, buy tickets, RSVP, and access the Vendor Marketplace as buyers, but they cannot create events. Event creation is only unlocked after the user completes verification and subscribes to a paid Business Workspace tier.

---

## Core Platform Purpose

EventGarde is designed as a B2B/B2C ecosystem for event logistics and vendor procurement. Verified organizers can centrally manage event operations such as RSVP tracking, ticketing, guest authentication, program itineraries, analytics, and vendor bookings.

Attendees can browse public events, purchase tickets, RSVP to private events, and access event-day QR check-in.

Marketplace vendors can offer services, communicate with organizers, approve or reject bookings, and lock confirmed schedules after payment.

---

## User Types

### 1. Personal Workspace User / Attendee

A Personal Workspace user is a free user who can attend and interact with events but cannot create events.

#### Capabilities

- Browse public Discovery Page events
- View public event details
- Purchase tickets
- Receive digital tickets with QR codes
- RSVP to private events
- Complete OTP verification for private RSVP access
- Access the Vendor Marketplace as a buyer for personal use
- Attend events through QR-based check-in

#### Restrictions

- Cannot create any type of event
- Cannot access organizer event-management tools
- Cannot bypass RSVP matching rules

Event creation is strictly blocked for Personal Workspace users. To organize events, the user must upgrade to a verified paid Business Workspace.

---

### 2. Organizer / Verified Business Workspace User

An Organizer is a user who has completed identity or business verification and subscribed to a paid Business Workspace tier.

Organizer capabilities depend on the subscribed tier.

#### General Organizer Capabilities

- Create and manage events
- Configure private or public event flows depending on tier
- Upload guest lists
- Generate secure unlisted invitation links
- Track RSVP headcount
- Configure public ticketing
- Manage ticket tiers
- View ticketing and registration analytics
- Search and book marketplace vendors
- Send vendor inquiries with attachments
- Negotiate with vendors through chat
- Submit vendor booking requests
- Complete payments to lock approved vendor bookings
- Manage team members through role-based access control
- Manage workspace subscription and billing

A user becomes an organizer only after verification and subscription.

---

### 3. Vendor / Marketplace Supplier

A Vendor is an independent service provider that operates inside the Vendor Marketplace.

Examples include:

- Caterers
- Photographers
- Venues
- Stylists
- Event service providers

#### Vendor Capabilities

- Create a vendor storefront
- Display portfolio assets
- Add service tags
- Show pricing structures
- Receive direct inquiries from organizers
- Receive file attachments such as mood boards, layout references, and design briefs
- Negotiate custom pricing and scope through chat
- Manually approve or reject booking requests
- View booking status
- Manage availability calendar
- Lock date/time slots after payment confirmation
- Deliver booked event services

Vendor bookings are manual approval only. The system never auto-accepts vendor bookings.

---

## Subscription Tiers

All event categories are mapped into exactly three paid Business Workspace tiers. A tier defines the organizer's allowed event types, capabilities, and limits. Organizers cannot mix capabilities between tiers.

---

### Tier 1: Starter

**Workspace type:** Mini-Workspace  
**Target users:** Individuals, independent coordinators, and casual milestone hosts

#### Assigned Event Types

- Weddings
- Birthdays
- Anniversaries
- Christenings
- Social milestone events

#### Core Features

- Private / unlisted events only
- Hidden from the public Discovery Page
- Strict authenticated RSVP matching
- Maximum 300 PAX per event
- Full access to browse and book marketplace vendors
- Optional customization micro-transactions for advanced UI layouts and program-flow builders

#### Important Restriction

Tier 1 organizers cannot publish public Discovery Page events. To create public listings, they must upgrade to Tier 2 or Tier 3.

---

### Tier 2: Professional

**Workspace type:** Business Workspace  
**Target users:** Corporations, academic institutions, SMEs, and mid-size agencies

#### Assigned Event Types

- Corporate events
- Business retreats
- Product launches
- Conferences
- Seminars
- Workshops
- Conventions
- Galas
- Competitions
- Award events

#### Core Features

- Medium-to-large attendee capacity
- Internal / unlisted event option
- Public listing option
- Custom registration forms
- Feedback forms
- Multi-user collaboration
- Up to 5 Admin seats
- Ticketing tools
- Attendee analytics
- Vendor marketplace access

#### Important Restriction

Tier 2 workspaces are capped at 5 Admin seats. If the seat limit is reached, invitations are blocked until the workspace upgrades or removes seats.

---

### Tier 3: Enterprise

**Workspace type:** Scale Workspace  
**Target users:** Major production houses and large-scale organizers

#### Assigned Event Types

- Trade shows
- Exhibitions
- Expos
- Trade fairs
- Festivals
- Cultural gatherings
- Music festivals
- Parades
- Sporting events
- Marathons
- Fun runs
- Tournaments

#### Core Features

- Unlimited PAX capacity
- Global Discovery Page spotlight listing
- Public ticket sales
- PayMongo payment integration
- Advanced RBAC
- Unlimited seats
- Enterprise-scale ticketing and analytics

Tier 3 is intended for large public events with high attendee volume and advanced operational requirements.

---

## Workspace Verification

Event creation is locked behind verification and subscription.

### Verification Requirements

| Workspace Type | Requirement |
|---|---|
| Tier 1 Individual Organizer | Government ID + selfie verification |
| Tier 2 / Tier 3 Business Organizer | DTI or SEC registration documents |

A Personal Workspace user who wants to organize an event must complete verification and subscribe to a Business Workspace before the event-creation UI is unlocked.

---

## Role-Based Access Control

Verified Business Workspaces use strict predefined roles. Custom roles are not allowed.

---

### Super Admin / Owner

**Assigned by:** Default workspace creator

#### Core Permissions

- Manage billing
- Manage subscription tier
- Handle legal or identity verification
- Invite team members by email
- Assign roles from predefined dropdowns
- Access all organizational assets

---

### Admin / Event Manager

**Assigned by:** Super Admin

#### Core Permissions

- Create and modify events
- Manage public ticketing tiers
- Monitor attendee analytics
- Communicate with marketplace vendors
- Book external marketplace vendors

#### Denied Permissions

- Billing management
- Workspace-level settings
- Verification document management

---

### Vendor-Member / Internal Staff

**Assigned by:** Super Admin or Admin

#### Core Permissions

- Fulfill internal event logistics
- Act as technical director, photographer, floor coordinator, or similar staff
- Use the mobile scanner module for entrance verification

#### Denied Permissions

- Event creation
- Event editing
- External vendor booking
- Billing access
- Financial data access

RBAC roles are limited to Super Admin, Admin, and Vendor-Member only.

---

## Public Event Discovery

The platform includes a public Discovery Page for public events.

### Discovery Page Features

- Browse public events
- View event details
- Select ticket tiers
- Register attendee information
- Purchase tickets
- Receive digital tickets
- Access QR-based check-in

Tier 1 private events are hidden from the Discovery Page. Tier 2 and Tier 3 events may be publicly listed depending on the tier configuration. Tier 3 includes Discovery Page spotlight listing.

---

## Private RSVP Flow

Private RSVP is mainly used for Tier 1 private social events.

### Flow

1. Organizer uploads a Master Guest List manually or by CSV.
2. System generates a secure unlisted invitation link.
3. Organizer shares the link externally through Messenger, WhatsApp, email, or other channels.
4. Guest opens the unlisted link.
5. Guest logs in or creates a Personal Workspace account.
6. Guest completes mandatory OTP verification through SMS or email.
7. System compares the guest's verified email or phone number against the Master Guest List.
8. If a match is found, RSVP is confirmed.
9. If no match is found, the guest is hard-blocked and told to contact the organizer.

The primary verification key is the guest's verified email address or mobile number, not their name. Names are only secondary display identifiers.

---

## RSVP Matching Rules

EventGarde uses strict authenticated RSVP matching.

### Rules

- RSVP matching uses verified email or verified phone number.
- RSVP matching never depends on name string matching.
- OTP verification is mandatory before RSVP submission.
- A guest cannot RSVP before authentication.
- If credentials match the Master Guest List, RSVP is confirmed.
- If credentials do not match, access is blocked.
- There is no manual approval fallback.
- There is no manual override path.

This system is designed for privacy, accuracy, and reduced organizer maintenance.

---

## Public Ticketing Flow

Public ticketing is available for eligible public events, especially Tier 3 Enterprise events.

### Flow

1. Admin configures a public event.
2. Admin adds promo assets, capacity, and pricing tiers.
3. Event is indexed on the Global Discovery Page.
4. Attendee selects a ticket tier.
5. Attendee enters registration information.
6. Checkout is completed through PayMongo.
7. Payment webhook confirms the transaction.
8. Digital ticket is issued with a secure QR code.
9. Dashboard updates revenue, tickets sold, and ticket-tier analytics.
10. Event-day staff scan QR codes for entrance verification.

Payment options include GCash, Maya, QR Ph, and cards through PayMongo.

---

## Ticketing Features

Supported ticketing features:

- Public event ticket sales
- Ticket tier configuration
- Early Bird tickets
- VIP tickets
- General Admission tickets
- Attendee registration
- Payment checkout
- Payment confirmation by webhook
- Digital ticket issuance
- QR code generation
- Ticket email delivery
- Real-time revenue dashboard
- Tickets sold tracking
- Ticket-tier split analytics
- Event-day QR scanning

Payment processing, ticket issuance, and dashboard analytics are triggered by a single webhook confirmation event to keep the system consistent and idempotent.

---

## Event-Day QR Scanning

EventGarde supports QR-based entrance verification during event day.

### Scanner Features

- Scan digital ticket QR codes
- Verify single-entry validity
- Detect invalid tickets
- Prevent duplicate ticket use
- Log attendee entrance
- Update event dashboard data

QR scanning is performed by Vendor-Member staff, not Admins, following the RBAC model.

---

## Vendor Marketplace

The Vendor Marketplace allows organizers to discover, communicate with, and book external event service providers.

### Marketplace Features

- Browse vendor categories
- Search available services
- View vendor storefronts
- View vendor portfolio assets
- View service tags
- View pricing structures
- Send inquiries
- Attach files to inquiries
- Send mood boards
- Send layout references
- Send design briefs
- Negotiate custom pricing through chat
- Submit formal booking requests
- Receive vendor approval or rejection
- Complete payment for approved bookings
- Lock vendor calendar slots after payment

The flow diagram describes organizers sending briefs and files to vendors, vendors reviewing inquiries, negotiating pricing, manually approving or rejecting bookings, and the system locking the calendar only after payment webhook confirmation.

---

## Vendor Booking Flow

Vendor bookings follow a controlled approval and payment-lock process.

### Flow

1. Organizer searches the Vendor Marketplace.
2. Organizer selects a vendor.
3. Organizer sends an inquiry with project details and attachments.
4. Vendor reviews the inquiry.
5. Organizer and vendor negotiate through chat.
6. Organizer submits a formal booking request.
7. Vendor manually approves or rejects the request.
8. If rejected, the organizer is notified and may receive marketplace recommendations.
9. If approved, the system prompts the organizer to pay.
10. Organizer completes payment.
11. Payment webhook confirms the transaction.
12. Vendor calendar slot is automatically locked.
13. Booking is confirmed with itinerary and receipt.

Vendor approval alone does not lock the vendor's calendar. Confirmed payment is required.

---

## Vendor Calendar Locking

Vendor calendar locking is payment-gated.

### Calendar Lock Rules

- Booking requests are never auto-accepted.
- Vendor must manually approve the request.
- Approval alone does not lock the slot.
- Organizer must complete payment.
- Payment confirmation triggers the lock.
- Locked date/time slots prevent double-booking.
- Calendar lock applies to the vendor's per-service availability calendar.

This ensures that vendor availability is only reserved after both approval and payment confirmation.

---

## Messaging and Attachments

The platform supports organizer-vendor communication.

### Messaging Features

- Direct vendor inquiry messages
- Chat-based negotiation
- File attachments
- Mood board uploads
- Layout reference uploads
- Design brief uploads
- Custom pricing discussion
- Scope clarification before booking

Messaging is part of the vendor inquiry and negotiation flow.

---

## Organizer Dashboard

The Organizer Dashboard provides event and business workspace visibility.

### Dashboard Features

- Event overview
- RSVP headcount monitoring
- Guest status tracking
- Ticket sales metrics
- Revenue metrics
- Ticket-tier analytics
- Registration analytics
- Vendor booking status
- Locked vendor itinerary
- Team role management
- Workspace billing and subscription visibility

Dashboard data updates during RSVP confirmation, ticket purchase, payment confirmation, and QR scanning.

---

## Monetization

EventGarde has three monetization streams.

---

### 1. Vendor Marketplace Commission

The platform takes a percentage-based commission from successful vendor bookings processed through the payment gateway. Vendors can list for free, and the platform monetizes successful booking conversion.

---

### 2. Workspace Subscriptions

Organizers pay flat monthly or annual fees for Tier 1, Tier 2, or Tier 3 Business Workspace access.

Subscriptions unlock:

- Event creation
- Workspace tools
- PAX capacity
- Admin tooling
- Tier-specific features

---

### 3. Customization Micro-Transactions

Tier 1 Starter users can pay one-time fees to unlock advanced custom UI layouts and complex program-flow builders beyond baseline templates.

Basic consumer interactions such as browsing and RSVPing are not taxed.

---

## Platform-Wide System Rules

The following rules apply across the platform:

1. No event can be created from a Personal Workspace.
2. Event creation requires verification and paid subscription.
3. Tier defines both the capability ceiling and capability floor.
4. Tier 1 cannot publish public Discovery Page events.
5. Tier 3 events are not limited to 300 PAX.
6. Tiers are not stackable.
7. Tiers are not partially upgradeable per event.
8. RBAC roles are limited to Super Admin, Admin, and Vendor-Member.
9. Custom workspace roles are not allowed.
10. RSVP matching always uses verified email or phone.
11. RSVP matching never uses name string matching.
12. Tier 1 RSVP mismatches are terminal.
13. There is no manual RSVP override path.
14. Vendor bookings are never auto-accepted.
15. Vendor calendar locking requires confirmed payment.
16. Vendor approval alone does not lock the calendar.

These rules define EventGarde's core behavior across users, organizers, vendors, payments, RSVP validation, and event-day access.

---

## Summary

EventGarde is a verified event-management and vendor-marketplace platform where users can attend events for free, while organizers must verify their identity or business and subscribe to a paid workspace before creating events.

The platform supports private RSVP events, public ticketed events, vendor procurement, manual vendor booking approval, payment-gated calendar locking, QR ticketing, event-day scanning, analytics, workspace roles, and tier-based feature access.
