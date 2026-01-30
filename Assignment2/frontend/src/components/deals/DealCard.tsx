'use client'
import { Deal } from "@/types"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/auth"
import {formatDate} from "@/lib/utils"

const DealCard = ({ deal }: { deal: Deal }) => {
  const isExpired = new Date(deal.expiresAt || "") < new Date()
  const router = useRouter()
  const user = getUser()
  const isVerified = user?.isVerified
  const isLocked = deal.isLocked
  const shouldShowLocked = !isVerified && isLocked
  const isDisabled = shouldShowLocked || isExpired

  return (
    <div
      className={`
        relative rounded-2xl border p-6 bg-white
        transition shadow-sm hover:shadow-md
        cursor-pointer
        ${shouldShowLocked ? "opacity-80" : ""}
        flex flex-col h-full
      `}
      onClick={() => {
        router.push(`/deal/${deal.dealId}`)
        console.log(deal)
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          {deal.title}
        </h3>

        <span
          className={`
            text-xs px-2 py-1 rounded-full
            ${shouldShowLocked
              ? "bg-slate-200 text-slate-600"
              : "bg-sky-100 text-sky-700"}
          `}
        >
          {shouldShowLocked ? "Locked" : "Unlocked"}
        </span>
      </div>
      {/* Description */}
      <div className="flex-1 mt-3">
        <p className="text-slate-600 text-sm leading-relaxed">
          {deal.description}
        </p>
      </div>

      {/* Footer - Sticks to bottom */}
      <div className="mt-6 flex items-center justify-between">
        {isExpired && <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">Expired</span>}
        {!isExpired && <span className="text-md font-medium text-slate-500">Expires: {deal.expiresAt && formatDate(deal.expiresAt)}</span>}

        {!isExpired && (
          <button
          disabled={isDisabled}
          className={`
            px-4 py-2 rounded-lg text-sm transition
            ${isDisabled
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"}
          `}
        >
          {shouldShowLocked ? "Verify to unlock" : "Claim deal"}
        </button>)}
      </div>
    </div>
  )
}

export default DealCard
