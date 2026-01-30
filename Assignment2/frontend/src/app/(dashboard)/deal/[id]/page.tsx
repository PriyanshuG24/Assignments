"use client"

import { useParams } from "next/navigation"
import { useDeals } from "@/hooks/useDeals"
import { useState } from "react"
import ClaimDealDialog from "@/components/deals/ClaimDealDialog"
import type { Deal } from "@/types"
import {formatDate} from "@/lib/utils"

export default function DealPage() {
  const { id } = useParams()
  const { deals,claimDeal } = useDeals()
  const [open, setOpen] = useState(false)

  const deal: Deal | null = deals.find((d) => d.dealId.toString() === id) || null
  const isExpired = new Date(deal?.expiresAt || "") < new Date()
  const handleClaim=async()=>{
    await claimDeal(id as string)
    setOpen(false)
  }
  if (!deal) {
    return (
      <div className="p-8 text-slate-500">
        Loading deal details...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <span className="text-sm text-sky-600 font-medium uppercase">
            {deal.category}
          </span>

          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            {deal.title}
          </h1>

          <p className="mt-1 text-slate-600">
            Partnered with {deal.partnerName}
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">

          {/* Description */}
          <p className="text-slate-700 leading-relaxed">
            {deal.description}
          </p>

          {/* Meta info */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-slate-500">Access</p>
              <p className="font-medium text-slate-900">
                {deal.isLocked ? "Verification required" : "Unlocked"}
              </p>
            </div>

            <div>
              {isExpired && <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">Expired</span>}
                      {!isExpired && <span className="text-md font-medium text-slate-500">Expires: {deal.expiresAt && formatDate(deal.expiresAt)}</span>}
            </div>

            <div>
              <p className="text-slate-500">Partner</p>
              <p className="font-medium text-slate-900">
                {deal.partnerName}
              </p>
            </div>
          </div>

          {/* Locked notice */}
          {deal.isLocked && (
            <div className="mt-6 rounded-xl bg-yellow-100 px-4 py-3 text-sm text-yellow-800">
              This deal is locked. Please verify your account to claim it.
            </div>
          )}

          {/* Action */}
          <div className="mt-8">
            <button
              onClick={() => setOpen(true)}
              disabled={deal.isLocked}
              className={`
                px-6 py-3 rounded-xl text-sm font-medium transition
                ${
                  deal.isLocked
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }
              `}
            >
              Claim It Now
            </button>
          </div>
        </div>
        <ClaimDealDialog
          open={open}
          onOpenChange={setOpen}
          deal={deal}
          onClaim={handleClaim}
        />
      </div>
    </div>
  )
}
