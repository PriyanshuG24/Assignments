'use client'
import { getUser } from "@/lib/auth"
import { useDeals } from "@/hooks/useDeals"
import { useState, useEffect } from "react"
import Logout from "../../../components/auth/Logout"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const {myDeals:deals} = useDeals()
  const {getVerify} = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    setUser(getUser());
  }, []);
  
  const handleVerify = async() => {
    const user = await getVerify()
    setUser(user)
  }

  const handleBackToDashboard = () => {
    console.log("Navigating to dashboard...");
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
      <div className="mx-auto max-w-6xl">

        {/* Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-slate-900">
            Profile
          </h1>
          
          <Button
            variant="outline"
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft/>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="
              w-full max-w-md
              rounded-2xl
              bg-white
              border border-slate-200
              p-8
              shadow-sm
            ">
              {/* Avatar placeholder */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-xl font-semibold text-black-700">
                {user?.username?.[0]?.toUpperCase()}
              </div>

              {/* User info */}
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold text-slate-900">
                  {user?.username}
                </h2>
                <p className="text-sm text-slate-600">
                  {user?.email}
                </p>

                {/* Verification status */}
                <span
                  className={`
                    inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium
                    ${
                      user?.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {user?.isVerified ? "Verified" : "Not verified"}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
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

                <Logout/>
              </div>
            </div>
          </div>

          {/* RIGHT: My Deals (Scrollable) */}
          <div className="
            rounded-2xl
            bg-white
            border border-slate-200
            p-6
            shadow-sm
            flex flex-col
          ">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              My Deals
            </h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {deals.length === 0 ? (
                <p className="text-sm text-slate-500">
                You haven't claimed any deals yet.
                </p>
            ) : (
                deals.map((claim) => {
                const deal = claim.dealData;

                return (
                    <div
                    key={claim.claimId}
                    className="rounded-xl border border-slate-200 p-4 bg-slate-50"
                    >
                    <div className="flex items-start justify-between">
                        <h3 className="text-sm font-medium text-slate-900">
                        {deal.title}
                        </h3>

                        {/* Claim status */}
                        <span
                        className={`
                            text-xs px-2 py-1 rounded-full font-medium
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

                    <p className="mt-1 text-xs text-slate-600">
                        {deal.partnerName}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Expires on{" "}
                        {deal.expiresAt ? new Date(deal.expiresAt).toLocaleDateString() : "N/A"}
                    </p>
                    </div>
                )
                })
            )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
