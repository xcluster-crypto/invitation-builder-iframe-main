"use client"

import { useState } from "react"
import { useInvitationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Plus, Trash2, CreditCard, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// List of common banks and e-wallets
const PAYMENT_OPTIONS = [
  { value: "BCA", label: "BCA" },
  { value: "Mandiri", label: "Mandiri" },
  { value: "BNI", label: "BNI" },
  { value: "BRI", label: "BRI" },
  { value: "CIMB Niaga", label: "CIMB Niaga" },
  { value: "Permata", label: "Permata" },
  { value: "Danamon", label: "Danamon" },
  { value: "GoPay", label: "GoPay" },
  { value: "OVO", label: "OVO" },
  { value: "DANA", label: "DANA" },
  { value: "LinkAja", label: "LinkAja" },
  { value: "ShopeePay", label: "ShopeePay" },
  { value: "PayPal", label: "PayPal" },
  { value: "Other", label: "Other" },
]

export function DigitalGifts() {
  const {
    enableDigitalGifts,
    setEnableDigitalGifts,
    giftAccounts,
    addGiftAccount,
    removeGiftAccount,
    updateGiftAccount,
  } = useInvitationStore()
  const [newBank, setNewBank] = useState("")
  const [newAccountName, setNewAccountName] = useState("")
  const [newAccountNumber, setNewAccountNumber] = useState("")
  const [showForm, setShowForm] = useState(false)

  const handleAddAccount = () => {
    if (newBank && newAccountName && newAccountNumber) {
      addGiftAccount({
        bank: newBank,
        accountName: newAccountName,
        accountNumber: newAccountNumber,
      })
      // Reset form
      setNewBank("")
      setNewAccountName("")
      setNewAccountNumber("")
      setShowForm(false)
    }
  }

  const getPaymentIcon = (bank: string) => {
    const lowerBank = bank.toLowerCase()
    if (
      lowerBank.includes("gopay") ||
      lowerBank.includes("ovo") ||
      lowerBank.includes("dana") ||
      lowerBank.includes("linkaja") ||
      lowerBank.includes("shopeepay") ||
      lowerBank.includes("paypal")
    ) {
      return <Wallet className="h-4 w-4" />
    }
    return <CreditCard className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="enable-gifts" checked={enableDigitalGifts} onCheckedChange={setEnableDigitalGifts} />
          <Label htmlFor="enable-gifts" className="text-base font-medium">
            Enable Digital Gifts
          </Label>
        </div>
      </div>

      {enableDigitalGifts && (
        <div className="space-y-4">
          {giftAccounts.length > 0 && (
            <div className="grid gap-4">
              {giftAccounts.map((account, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPaymentIcon(account.bank)}
                        <span className="font-medium">{account.bank}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeGiftAccount(index)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Account Name:</span> {account.accountName}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Account Number:</span> {account.accountNumber}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {showForm ? (
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="bank">Bank / E-Wallet</Label>
                  <Select value={newBank} onValueChange={setNewBank}>
                    <SelectTrigger id="bank">
                      <SelectValue placeholder="Select bank or e-wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input
                    id="account-name"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                    placeholder="Enter account holder name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    value={newAccountNumber}
                    onChange={(e) => setNewAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAccount} disabled={!newBank || !newAccountName || !newAccountNumber}>
                    Add Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button onClick={() => setShowForm(true)} className="w-full flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Bank Account / E-Wallet
            </Button>
          )}

          {giftAccounts.length === 0 && !showForm && (
            <div className="text-center p-6 border border-dashed rounded-md bg-muted/10">
              <Gift className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Add bank accounts or e-wallet information for your guests to send digital gifts
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
