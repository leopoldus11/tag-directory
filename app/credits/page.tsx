import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditBadge } from "@/components/credit-badge";

// Server-side rank calculation
function getRankFromCredits(credits: number) {
  if (credits >= 5000) return "Diamond";
  if (credits >= 1500) return "Platinum";
  if (credits >= 500) return "Gold";
  if (credits >= 100) return "Silver";
  return "Bronze";
}
import { RankDisplay } from "@/components/rank-display";
import type { Metadata } from "next";
import { Trophy, Star, TrendingUp, Award, Users, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Credits & Ranking System | tracking.directory",
  description: "Learn how the contributor credit and ranking system works on tracking.directory",
};

const creditActivities = [
  { activity: "Submit a Tag", credits: 10, icon: "📝" },
  { activity: "Tag Gets Verified", credits: 25, icon: "✅" },
  { activity: "Tag Gets 10+ Views", credits: 5, icon: "👁️" },
  { activity: "Tag Gets 50+ Views", credits: 15, icon: "🔥" },
  { activity: "Tag Gets 100+ Views", credits: 30, icon: "⭐" },
  { activity: "Fix a Bug", credits: 15, icon: "🐛" },
  { activity: "Improve Documentation", credits: 10, icon: "📚" },
  { activity: "Answer Issue", credits: 5, icon: "💬" },
  { activity: "Review PR", credits: 10, icon: "👀" },
  { activity: "Monthly Active", credits: 20, icon: "📅" },
];

const rankTiers = [
  { rank: "Bronze", minCredits: 0, maxCredits: 99, color: "text-amber-600", icon: "🥉" },
  { rank: "Silver", minCredits: 100, maxCredits: 499, color: "text-slate-400", icon: "🥈" },
  { rank: "Gold", minCredits: 500, maxCredits: 1499, color: "text-yellow-500", icon: "🥇" },
  { rank: "Platinum", minCredits: 1500, maxCredits: 4999, color: "text-cyan-400", icon: "💎" },
  { rank: "Diamond", minCredits: 5000, maxCredits: Infinity, color: "text-purple-400", icon: "💠" },
];

export default function CreditsPage() {
  return (
    <SidebarWrapper>
      <main className="flex-1 md:ml-64">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-semibold tracking-tight">Credits & Ranking System</h1>
            <p className="text-lg text-muted-foreground">
              Earn credits by contributing to the community and climb the ranks
            </p>
          </div>

          {/* How It Works */}
          <Card className="mb-8 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                How It Works
              </CardTitle>
              <CardDescription>
                Credits are earned through various contribution activities and represent your value to the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The credit system rewards active contributors with points for their contributions. 
                  Your total credits determine your rank, which affects your visibility and profile features.
                </p>
                <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
                  <p className="text-sm font-medium mb-2">Credit Multipliers:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <strong>First Contribution:</strong> 1.5x multiplier (encourages new contributors)</li>
                    <li>• <strong>Verified Contributor:</strong> 1.2x multiplier (after 3 verified tags)</li>
                    <li>• <strong>Maintainer:</strong> 1.5x multiplier (for core team members)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earning Credits */}
          <Card className="mb-8 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Earning Credits
              </CardTitle>
              <CardDescription>
                Ways to earn credits and contribute to the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {creditActivities.map((item) => (
                  <div
                    key={item.activity}
                    className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/10 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.activity}</span>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      +{item.credits}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ranking Tiers */}
          <Card className="mb-8 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Ranking Tiers
              </CardTitle>
              <CardDescription>
                Climb through the ranks as you earn more credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rankTiers.map((tier) => {
                  const exampleCredits = tier.minCredits === 0 ? 50 : tier.minCredits;
                  const rank = getRankFromCredits(exampleCredits);
                  
                  return (
                    <div
                      key={tier.rank}
                      className="rounded-lg border border-border/30 bg-muted/10 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{tier.icon}</span>
                          <div>
                            <h3 className={`font-semibold ${tier.color}`}>{tier.rank}</h3>
                            <p className="text-xs text-muted-foreground">
                              {tier.minCredits.toLocaleString()} - {tier.maxCredits === Infinity ? "∞" : tier.maxCredits.toLocaleString()} credits
                            </p>
                          </div>
                        </div>
                        <CreditBadge credits={exampleCredits} rank={rank} size="sm" />
                      </div>
                      <RankDisplay rank={rank} credits={exampleCredits} showProgress={tier.maxCredits !== Infinity} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mb-8 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Rank Benefits
              </CardTitle>
              <CardDescription>
                Unlock features and visibility as you progress through the ranks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                  <h4 className="mb-2 font-semibold text-amber-600">Bronze (0-99)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Basic profile</li>
                    <li>• Standard listing</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                  <h4 className="mb-2 font-semibold text-slate-400">Silver (100-499)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Enhanced profile badge</li>
                    <li>• Featured in "Rising Contributors"</li>
                    <li>• Priority in search results</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                  <h4 className="mb-2 font-semibold text-yellow-500">Gold (500-1499)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Gold badge on profile</li>
                    <li>• Featured in "Top Contributors"</li>
                    <li>• Profile highlighted on homepage</li>
                    <li>• Early access to new features</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                  <h4 className="mb-2 font-semibold text-cyan-400">Platinum (1500-4999)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Platinum badge on profile</li>
                    <li>• Dedicated profile section</li>
                    <li>• Featured in "Elite Contributors"</li>
                    <li>• Invitation to core team discussions</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border/30 bg-muted/10 p-4 sm:col-span-2">
                  <h4 className="mb-2 font-semibold text-purple-400">Diamond (5000+)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Diamond badge on profile</li>
                    <li>• Hall of Fame listing</li>
                    <li>• Core team consideration</li>
                    <li>• Speaking opportunities at events</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-8 text-center">
              <Target className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-semibold">Ready to Start Earning Credits?</h2>
              <p className="mb-6 text-muted-foreground">
                Start contributing tags, scripts, and standards to the community
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="/contribute"
                  className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start Contributing
                </a>
                <a
                  href="/members"
                  className="rounded-full border border-border px-6 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  View Top Contributors
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarWrapper>
  );
}

