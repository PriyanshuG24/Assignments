"use client";
import { getUser } from "@/lib/auth";
import { useDeals } from "@/hooks/useDeals";
import { useEffect, useState } from "react";
import Logout from "../../../components/auth/Logout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  const { fetchMyClaims, myDeals:deals, loadingMyDeals } = useDeals();
  const { getVerify } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
    fetchMyClaims(); 
  }, [fetchMyClaims]);
  const handleVerify = async() => {
    const user = await getVerify()
    setUser(user)
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-sky-50 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-32 mb-8"></div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="h-96 bg-slate-200 rounded-2xl"></div>
              <div className="h-96 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-sky-50 p-6">
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>

        <Button
          variant="outline"
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 cursor-pointer relative z-50 pointer-events-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* TOP: Profile Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-2xl font-semibold text-slate-900">
              {user?.username?.[0]?.toUpperCase()}
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-900">{user?.username}</h2>
              <p className="text-sm text-slate-600">{user?.email}</p>

              <span
                className={`
                  inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium
                  ${user?.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                `}
              >
                {user?.isVerified ? "Verified" : "Not verified"}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-3 w-full sm:w-56">
            {!user?.isVerified && (
              <button
                className="
                  w-full rounded-xl
                  bg-slate-900 py-2.5
                  text-sm font-medium text-white
                  hover:bg-slate-800
                  transition
                "
                onClick={handleVerify}
              >
                Get Verified
              </button>
            )}
            <Logout />
          </div>
        </div>
      </div>

      {/* BOTTOM: My Deals */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">My Deals</h2>

          {loadingMyDeals && (
            <span className="text-xs text-slate-500">Loading...</span>
          )}
        </div>

        {/* Scroll only after ~5 items */}
        <div className="max-h-[360px] overflow-y-auto pr-2 space-y-4">
          {deals.length === 0 ? (
            <p className="text-sm text-slate-500">You haven't claimed any deals yet.</p>
          ) : (
            deals.map((claim) => {
              const deal = claim.dealData;

              return (
                <div
                  key={claim.claimId}
                  className="rounded-xl border border-slate-200 p-4 bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium text-slate-900">{deal.title}</h3>

                    <span
                      className={`
                        text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap
                        ${
                          claim.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : claim.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-200 text-slate-600"
                        }
                      `}
                    >
                      {claim.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-600">{deal.partnerName}</p>

                  <p className="mt-1 text-xs text-slate-500">
                    Expires on{" "}
                    {deal.expiresAt ? new Date(deal.expiresAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Optional hint when there are many */}
        {deals.length > 5 && (
          <p className="mt-3 text-xs text-slate-500">
            Scroll to see more claimed deals.
          </p>
        )}
      </div>
    </div>
  </div>
);

}
