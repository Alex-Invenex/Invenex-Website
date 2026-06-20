import { generatePageMetadata } from "@/lib/metadata";
import { ProfileClient } from "./profile-client";

export const metadata = generatePageMetadata({
  title: "Company Profile",
  description:
    "Invenex Solutions — premium web development, mobile apps & digital platforms for businesses that demand excellence and innovation. Based in Koratty, Thrissur, Kerala.",
  path: "/profile",
});

export default function ProfilePage() {
  return <ProfileClient />;
}
