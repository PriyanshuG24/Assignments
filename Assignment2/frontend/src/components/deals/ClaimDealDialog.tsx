"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Deal } from "@/types"

type ClaimDealDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  deal:Deal
  onClaim: () => void
  loading?: boolean
}

export default function ClaimDealDialog({
  open,
  onOpenChange,
  deal,
  onClaim,
  loading = false,
}: ClaimDealDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-md
          rounded-2xl
          bg-gradient-to-b from-sky-50 via-white to-sky-100
          border border-slate-200
          shadow-lg
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Claim this deal
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Review the deal details before claiming.
          </DialogDescription>
        </DialogHeader>

        {/* Deal details */}
        <div className="mt-4 space-y-3">
          <div>
            <h3 className="text-sm font-medium text-slate-700">
              {deal.title}
            </h3>
            <p className="text-sm text-slate-600">
              {deal.description}
            </p>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Partner</span>
            <span className="text-slate-700 font-medium">
              {deal.partnerName}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Expires</span>
            <span className="text-slate-700">
              {new Date(deal.expiresAt as string).toLocaleDateString()}
            </span>
          </div>

          {deal.isLocked && (
            <div className="rounded-xl bg-yellow-100 px-3 py-2 text-xs text-yellow-800">
              This deal requires account verification.
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>

          <Button
            onClick={onClaim}
            disabled={loading || deal.isLocked}
            className="
              rounded-xl
              bg-slate-900
              text-white
              hover:bg-slate-800
            "
          >
            {loading ? "Claiming..." : "Claim deal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
