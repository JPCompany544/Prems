"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wallet, Gift, ListTodo, Share2, Wallet2, Play, Twitter, MessageCircle, Lightbulb, Users, Calendar, Lock, Check, X, Clock, Info, ChevronLeft, Copy, Headset, Trophy } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "./logo.png";
import tapLogo from "./logo-copy.png";

// Cross-browser compatible UUID generator
function generateUUID() {
  // Try the modern crypto API first
  if (typeof window !== 'undefined' && window.crypto) {
    // @ts-ignore - Some browsers might have this under a different name
    const cryptoObj = window.crypto || (window as any).msCrypto;

    // Check for the modern crypto.randomUUID() method
    if (typeof cryptoObj.randomUUID === 'function') {
      return cryptoObj.randomUUID();
    }

    // Fallback for browsers with crypto but no randomUUID
    if (cryptoObj.getRandomValues) {
      // @ts-ignore - TS doesn't know about Uint8Array in some contexts
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ cryptoObj.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
  }

  // Fallback for older browsers without crypto support
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

// Use a consistent trust name to prevent hydration mismatches
// In a real app, you might want to fetch this from a database or use a stable ID
const TRUST_NAMES = [
  "AlphaWolf", "BetaRay", "GammaBurst", "DeltaForce", "EpsilonEdge",
  "ZetaPrime", "EtaSpark", "ThetaWave", "IotaBeam", "KappaStrike",
  "LambdaCore", "MuonShift", "NuVector", "XiBlade", "OmicronStar",
  "PiOrbit", "RhoRider", "SigmaSurge", "TauTitan", "UpsilonUp",
  "PhiFlow", "ChiChop", "PsiPower", "OmegaZen", "AcePilot",
  "SkyWalker", "CloudStrider", "StormChaser", "WindWaker", "RainMaker",
  "SunSeeker", "MoonDancer", "StarGazer", "CometRider", "PlanetPop",
  "GalaxyGuard", "CosmoKing", "AstroAce", "OrbitOne", "RocketMan",
  "BlueSteel", "RedRover", "GreenGiant", "GoldRush", "SilverSurfer",
  "BronzeBear", "IronFist", "SteelSoul", "MetalHead", "CyberPunk"
] as const;

function useTrustName() {
  // This will only run on the client side
  const [trustName, setTrustName] = React.useState<string>("@trust_raven");

  React.useEffect(() => {
    // Only update on client side
    const randomIndex = Math.floor(Math.random() * TRUST_NAMES.length);
    setTrustName(`${TRUST_NAMES[randomIndex]}@trust`);
  }, []);

  return trustName;
}

function randomAmount() {
  return Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000;
}

// Isolated component to prevent re-renders on main page
function RecentCashouts() {
  const [cashouts, setCashouts] = useState<Array<{
    id: string;
    name: string;
    timestamp: string;
    amount: number;
  }>>([]);

  // Initialize with 10 items
  useEffect(() => {
    // Generate 10 unique random indices
    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 10) {
      uniqueIndices.add(Math.floor(Math.random() * TRUST_NAMES.length));
    }

    const initialCashouts = Array.from(uniqueIndices).map(index => ({
      id: generateUUID(),
      name: `${TRUST_NAMES[index]}@trust`,
      timestamp: new Date().toISOString(),
      // 50% chance of $2000, else random amount
      amount: Math.random() < 0.5 ? 2000 : randomAmount(),
    }));

    setCashouts(initialCashouts);
  }, []);

  // Update logic - smooth stream of 10 items
  useEffect(() => {
    const t = setInterval(() => {
      setCashouts((prev) => {
        const next = [
          {
            id: generateUUID(),
            name: `${TRUST_NAMES[Math.floor(Math.random() * TRUST_NAMES.length)]}@trust`,
            timestamp: new Date().toISOString(),
            amount: Math.random() < 0.5 ? 2000 : randomAmount(),
          },
          ...prev,
        ].slice(0, 10);
        return next;
      });
    }, 5000); // 5s update for stability
    return () => clearInterval(t);
  }, []);

  return (
    <Card className="futuristic-blue p-5 h-[740px] overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-blue-400" size={20} />
        <p className="text-lg font-semibold text-white">Recent Cashouts</p>
      </div>

      <div className="flex flex-col gap-3">
        {cashouts.map((c, i) => (
          <div className="flex justify-between items-center border-b border-blue-400/20 pb-2 last:border-0 hover:bg-white/5 px-2 rounded-lg h-[52px]">
            <div className="flex items-center gap-3 overflow-hidden flex-1">
              {/* RANKING OR MEDAL */}
              <div className="w-6 flex justify-center flex-shrink-0">
                {i === 0 && <Trophy className="text-yellow-400 drop-shadow-md animate-pulse" size={20} />}
                {i === 1 && <Trophy className="text-gray-300 drop-shadow-md" size={18} />}
                {i === 2 && <Trophy className="text-orange-600 drop-shadow-md" size={18} />}
                {i > 2 && <span className="text-gray-500 font-mono text-sm font-bold">#{i + 1}</span>}
              </div>

              <div className="overflow-hidden flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate w-full">{c.name}</p>
                <p className="text-[10px] text-gray-400 tabular-nums">
                  {new Date(c.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0 w-20">
              <p className="font-bold text-green-400 text-sm tabular-nums text-right w-full">
                {formatUSD(c.amount)}
              </p>
              <p className="text-[10px] text-green-600">sent</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DashboardContent() {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [cashoutOpen, setCashoutOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);

  // Cashout Flow State
  const [cashoutStep, setCashoutStep] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedNetworkObj, setSelectedNetworkObj] = useState<{ name: string, address: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [walletAddress, setWalletAddress] = useState("");

  // Copy wallet address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const [xp, setXp] = useState(200); // Starting XP
  const [isTapping, setIsTapping] = useState(false);

  // Energy System
  const MAX_ENERGY = 1000;
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [lastTapTime, setLastTapTime] = useState(Date.now());
  const [pointerStart, setPointerStart] = useState<{ x: number, y: number } | null>(null);

  // Energy Replenish Logic
  useEffect(() => {
    const checkReplenish = setInterval(() => {
      const timeSinceLastTap = Date.now() - lastTapTime;
      if (timeSinceLastTap > 2000 && energy < MAX_ENERGY) {
        setEnergy(MAX_ENERGY);
      }
    }, 500);

    return () => clearInterval(checkReplenish);
  }, [lastTapTime, energy]);

  // 30-minute countdown timer logic
  useEffect(() => {
    if (cashoutOpen && (cashoutStep === 2 || cashoutStep === 3) && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (!cashoutOpen) {
      // Reset timer when closed
      setTimeLeft(30 * 60);
      setCashoutStep(1);
      setSelectedCurrency("");
      setSelectedNetwork("");
      setWalletAddress("");
      setSelectedNetworkObj(null);
    }
  }, [cashoutOpen, cashoutStep, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };



  const [countdownEnd] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + 24);
    return d;
  });

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);



  const remaining = useMemo(() => {
    const diff = Math.max(0, countdownEnd.getTime() - now.getTime());
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [now, countdownEnd]);

  // Currency Data Structure with wallet addresses for each network
  const currencies = useMemo(() => [
    {
      code: "USDT",
      name: "Tether",
      networks: [
        { name: "BSC (BEP-20)", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" },
        { name: "TRON (TRC-20)", address: "TXvHMBJf3UdBKKmB3LpNhH3zfjmpcAFv2g" },
        { name: "ETH (ERC-20)", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" }
      ]
    },
    {
      code: "BTC",
      name: "Bitcoin",
      networks: [
        { name: "Bitcoin", address: "bc1qwvcp0eqfpqa79lnhjcfa3q2m3qrtqdtd9lqtgn" }
      ]
    },
    {
      code: "TON",
      name: "Toncoin",
      networks: [
        { name: "TON", address: "UQAuncoKl0J85JJfMkfy4mucbKjGR-rJpHsYNfUCSfc_WeSV" }
      ]
    },
    {
      code: "POL",
      name: "Polygon",
      networks: [
        { name: "Polygon", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" }
      ]
    },
    {
      code: "TRX",
      name: "TRON",
      networks: [
        { name: "TRON (TRC-20)", address: "TXvHMBJf3UdBKKmB3LpNhH3zfjmpcAFv2g" }
      ]
    },
    {
      code: "ETH",
      name: "Ethereum",
      networks: [
        { name: "BSC (BEP-20)", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" },
        { name: "ETH (ERC-20)", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" }
      ]
    },
    {
      code: "BNB",
      name: "BNB",
      networks: [
        { name: "BSC (BEP-20)", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" }
      ]
    },
    {
      code: "SOL",
      name: "Solana",
      networks: [
        { name: "Solana", address: "3No1roPwxrg7Ko8UUhy1RYDRtYicnTPRxkyDSbf2jM4Q" }
      ]
    },
    {
      code: "DOGE",
      name: "Dogecoin",
      networks: [
        { name: "Dogecoin", address: "DCF6wfzHne7Wd49Wg9kqwSj2gvPLUbBboC" }
      ]
    },
    {
      code: "USDC",
      name: "USD Coin",
      networks: [
        { name: "ERC-20", address: "0x0B73d78764eA378d5a5348D5028D33FD62838416" },
        { name: "TRC-20", address: "TXvHMBJf3UdBKKmB3LpNhH3zfjmpcAFv2g" }
      ]
    },
    {
      code: "XMR",
      name: "Monero",
      networks: [
        { name: "Monero", address: "3No1roPwxrg7Ko8UUhy1RYDRtYicnTPRxkyDSbf2jM4Q" }
      ]
    },
    {
      code: "DASH",
      name: "Dash",
      networks: [
        { name: "Dash", address: "XvMPuh6hPppDd9KTvkbVuD5y2EPahSUYyu" }
      ]
    },
    {
      code: "BCH",
      name: "Bitcoin Cash",
      networks: [
        { name: "Bitcoin Cash", address: "qzzxswkp9nntlhf0kut0pgusfyapv08xnst04rcvdr" }
      ]
    },
  ], []);

  // Calculate dollar value: 1 XP = $0.4
  const dollarValue = useMemo(() => {
    return (xp * 0.4).toFixed(0);
  }, [xp]);

  // Calculate level: 1 level per 1000 XP
  const level = useMemo(() => {
    return Math.floor(xp / 1000) + 1; // Start at level 1
  }, [xp]);

  // Calculate current level XP (XP within current level)
  const currentLevelXP = useMemo(() => {
    return xp % 1000;
  }, [xp]);

  // Get level name based on level number (changes every 3 levels)
  const levelName = useMemo(() => {
    if (level <= 3) return "Bronze";
    if (level <= 6) return "Silver";
    if (level <= 9) return "Gold";
    if (level <= 12) return "Platinum";
    return "Diamond";
  }, [level]);

  // Get level color based on level
  const levelColor = useMemo(() => {
    if (level <= 3) return "bg-yellow-700";
    if (level <= 6) return "bg-gray-400";
    if (level <= 9) return "bg-yellow-500";
    if (level <= 12) return "bg-cyan-400";
    return "bg-blue-500";
  }, [level]);

  // Payment calculations for cashout
  const gasFeePercent = 0.0175; // 1.75%
  const gasFee = useMemo(() => {
    return (parseFloat(dollarValue) * gasFeePercent).toFixed(2);
  }, [dollarValue]);

  const minimumReceived = useMemo(() => {
    return (parseFloat(dollarValue) - parseFloat(gasFee)).toFixed(2);
  }, [dollarValue, gasFee]);

  // Handle tap on floating logo
  // Tap animations state
  const [tapAnimations, setTapAnimations] = useState<{ id: number; x: number; y: number }[]>([]);

  // Handle pointer down to track potential tap
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setPointerStart({ x: e.clientX, y: e.clientY });
    setIsTapping(true); // Visual feedback immediately
  };

  // Handle pointer up to validate tap (ensure it wasn't a scroll)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsTapping(false);

    if (!pointerStart) return;

    // Calculate distance moved
    const moveX = Math.abs(e.clientX - pointerStart.x);
    const moveY = Math.abs(e.clientY - pointerStart.y);

    // Only count as tap if moved less than 10px (avoids scroll gestures)
    if (moveX < 10 && moveY < 10) {
      handleTap(e);
    }

    setPointerStart(null);
  };

  const handlePointerLeave = () => {
    setIsTapping(false);
    setPointerStart(null);
  }

  // Handle verified tap
  const handleTap = (e: React.MouseEvent<any> | React.TouchEvent<any> | React.PointerEvent<any>) => {
    if (energy <= 0) return; // No energy left

    // Sharp vibration feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }

    setXp((prev) => prev + 20); // Add 20 XP per tap
    setEnergy((prev) => Math.max(0, prev - 1)); // Consume 1 Energy
    setLastTapTime(Date.now());

    // Get coordinates safely for animation
    let clientX, clientY;
    // @ts-ignore
    if (e.touches && e.touches.length > 0) {
      // @ts-ignore
      clientX = e.touches[0].clientX;
      // @ts-ignore
      clientY = e.touches[0].clientY;
      // @ts-ignore
    } else if (e.clientX) {
      // @ts-ignore
      clientX = e.clientX;
      // @ts-ignore
      clientY = e.clientY;
    } else {
      // Fallback
      clientX = window.innerWidth / 2;
      clientY = window.innerHeight / 2;
    }

    // Add animation instance with random spread
    const id = Date.now() + Math.random();
    const randomX = (Math.random() - 0.5) * 40;

    setTapAnimations((prev) => [...prev, { id, x: clientX + randomX, y: clientY - 50 }]);

    // Cleanup
    setTimeout(() => {
      setTapAnimations((prev) => prev.filter((a) => a.id !== id));
    }, 1000);
  };

  const searchParams = useSearchParams();
  const handle = searchParams.get("handle");
  const displayName = handle ? handle.split("@")[0] : "Chuko";

  return (
    <div className="min-h-screen trust-bg text-[#F0F0F0] px-3 py-3 flex flex-col gap-3">

      {/* HEADER */}
      <header className="w-full flex items-center justify-center py-2">
        <div className="flex items-center gap-3 px-8 py-2 bg-gradient-to-r from-[#003366] to-[#0055AA] border border-blue-400/30 rounded-2xl shadow-[0_0_15px_rgba(0,100,255,0.3)] backdrop-blur-md">
          <Image
            src={logo}
            alt="Chuko Premium"
            width={40}
            height={40}
            className="rounded-lg shadow-sm"
          />
          <h1 className="text-xl font-bold tracking-wider text-white uppercase drop-shadow-md font-sans">
            Trust Premium XP
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* LEFT COLUMN MAIN */}
        <div className="flex flex-col items-center gap-3">

          {/* XP SUMMARY & LEVEL - XP IS MAIN CONTAINER */}
          {/* XP SUMMARY & LEVEL GRID */}
          <div className="flex flex-col gap-2 w-full">
            {/* ROW 1: XP and LEVEL */}
            <div className="grid grid-cols-2 gap-2">
              {/* XP CARD */}
              <Card className="futuristic-blue p-3 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={logo}
                    width={32}
                    height={32}
                    alt="small logo"
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col leading-none">
                    <p className="text-xl font-extrabold text-white drop-shadow-md tabular-nums">{xp} XP</p>
                    <p className="text-xs font-bold text-[#45B2FF] drop-shadow-sm tabular-nums">${dollarValue}</p>
                  </div>
                </div>
              </Card>

              {/* LEVEL CARD */}
              <Card className="futuristic-blue p-3 flex flex-col justify-between gap-1">
                <div className="flex flex-col leading-none">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-gray-300">Lvl {level}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 ${levelColor} rounded text-white`}>
                      {levelName}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Progress
                    value={(currentLevelXP / 1000) * 100}
                    className="h-1.5 bg-black/40 border border-white/5"
                    indicatorClassName="bg-gradient-to-r from-orange-400 to-orange-600"
                  />
                  <p className="text-[10px] text-gray-400 whitespace-nowrap text-right tabular-nums">
                    {currentLevelXP} / 1000 XP
                  </p>
                </div>
              </Card>
            </div>

            {/* ROW 2: NEXT IN and SUPPORT */}
            <div className="grid grid-cols-2 gap-2">
              <Card className="futuristic-blue p-2 flex items-center justify-center gap-2 h-10">
                <Gift className="text-yellow-300 animate-pulse flex-shrink-0" size={16} />
                <p className="text-xs text-gray-300 font-medium tabular-nums whitespace-nowrap">
                  {remaining}
                </p>
              </Card>

              <Button
                variant="ghost"
                className="futuristic-blue text-white hover:text-white flex items-center gap-2 justify-center h-10 text-xs px-0"
                onClick={() => window.open("https://t.me/Trustwalletsupporr", "_blank")}
              >
                <Headset size={16} className="text-blue-400" />
                Support
              </Button>
            </div>
          </div>

          {/* GREETING */}
          <Card className="futuristic-blue p-3 w-full">
            <p className="text-sm font-semibold text-white">Hi {displayName} 👋</p>
          </Card>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-2 w-full">
            <Button
              className="flex flex-col gap-1 h-auto py-3 bg-gradient-to-b from-purple-500 to-purple-600 border-b-4 border-purple-800 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all"
              onClick={() => setTasksOpen(true)}
            >
              <ListTodo size={20} className="mb-0.5" />
              <span className="font-bold text-[10px]">TASKS</span>
            </Button>
            <Button
              className="flex flex-col gap-1 h-auto py-3 bg-gradient-to-b from-emerald-500 to-emerald-600 border-b-4 border-emerald-800 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all"
              onClick={() => {
                if (xp < 5000) {
                  toast.error("Insufficient XP", {
                    description: `Minimum cashout is 5000 XP. You currently have ${xp} XP.`,
                  });
                } else {
                  setCashoutOpen(true);
                }
              }}
            >
              <Wallet2 size={20} className="mb-0.5" />
              <span className="font-bold text-[10px]">CASHOUT</span>
            </Button>
            <Button
              className="flex flex-col gap-1 h-auto py-3 bg-gradient-to-b from-orange-400 to-orange-600 border-b-4 border-orange-800 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all"
              onClick={() => setReferralOpen(true)}
            >
              <Share2 size={20} className="mb-0.5" />
              <span className="font-bold text-[10px]">REFERRAL</span>
            </Button>
          </div>



          <div className="flex flex-col items-center gap-2 mt-2">
            <div
              className="relative touch-manipulation"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
            >
              <Image
                src={tapLogo}
                width={192}
                height={192}
                alt="Chuko Logo"
                className={`animate-[float_3s_ease-in-out_infinite] cursor-pointer transition-transform select-none active:scale-95 will-change-transform ${isTapping ? "scale-90 brightness-125" : ""
                  } ${energy === 0 ? "grayscale opacity-50" : ""}`}
                draggable={false}
              />
            </div>
            <p className="text-blue-400 font-semibold text-lg">
              TAP TO EARN XP
            </p>
          </div>

          {/* ENERGY BAR */}
          <div className="w-full flex flex-col gap-2 mt-2">
            <Progress
              value={(energy / MAX_ENERGY) * 100}
              className="h-6 bg-black/40 border border-white/5 rounded-full"
              indicatorClassName="energy-gradient"
            />
            <div className="flex justify-between items-center px-1">
              <p className="text-sm text-blue-200 font-medium">Energy</p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-white font-bold">{energy} / {MAX_ENERGY}</p>
                <div className="w-2 h-2 bg-cyan-400 rotate-45 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* RECENT CASHOUTS */}
          {/* RECENT CASHOUTS */}
          <RecentCashouts />
        </div>
      </div>

      {/* TAP ANIMATIONS LAYER */}
      {tapAnimations.map((anim) => (
        <div
          key={anim.id}
          className="fixed pointer-events-none text-3xl font-black text-green-400 z-50 animate-[float-up_0.8s_ease-out_forwards] select-none"
          style={{
            left: anim.x,
            top: anim.y,
            textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            transform: 'translate(-50%, -50%)'
          }}
        >
          +20 XP
        </div>
      ))}

      {/* FLOAT ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-up {
          0% { transform: translate(-50%, -50%) translateY(0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translateY(-100px) scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* TASKS MODAL */}
      <Dialog open={tasksOpen} onOpenChange={setTasksOpen}>
        <DialogContent className="bg-[#07182B] border-white/10 text-white max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Earn more XP</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {/* Task 1 - LOCKED */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 grayscale">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Play size={24} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Watch Trust Wallet Tutorial</h3>
                <p className="text-sm text-gray-400 mt-1">Watch a 30-seconds video about Trust Wallet.</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  +10 XP
                </div>
              </div>
              <div className="flex-shrink-0">
                <Lock size={20} className="text-gray-500" />
              </div>
            </div>

            {/* Task 2 - LOCKED */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 grayscale">
              <div className="flex-shrink-0 w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center">
                <Twitter size={24} className="text-sky-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Follow on X (Twitter)</h3>
                <p className="text-sm text-gray-400 mt-1">Follow Trust Wallet on X (Twitter)</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  +15 XP
                </div>
              </div>
              <div className="flex-shrink-0">
                <Lock size={20} className="text-gray-500" />
              </div>
            </div>

            {/* Task 3 - LOCKED */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 grayscale">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <MessageCircle size={24} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Join Telegram Channel</h3>
                <p className="text-sm text-gray-400 mt-1">Join our official Telegram channel</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  +12 XP
                </div>
              </div>
              <div className="flex-shrink-0">
                <Lock size={20} className="text-gray-500" />
              </div>
            </div>

            {/* Task 4 - LOCKED */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 grayscale">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Lightbulb size={24} className="text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Watch Crypto Tips Video</h3>
                <p className="text-sm text-gray-400 mt-1">Learn Crypto tips in 1 minute</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  +10 XP
                </div>
              </div>
              <div className="flex-shrink-0">
                <Lock size={20} className="text-gray-500" />
              </div>
            </div>

            {/* Task 5 - UNLOCKED WITH START BUTTON */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Share with Friends</h3>
                <p className="text-sm text-gray-400 mt-1">Share the app and earn bonus XP</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  +20 XP
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  Start
                </Button>
              </div>
            </div>

            {/* Task 6 - UNLOCKED WITH START BUTTON */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Daily Check-in</h3>
                <p className="text-sm text-gray-400 mt-1">Check in daily to earn bonus XP</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  +8 XP
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  Start
                </Button>
              </div>
            </div>
          </div>

          {/* Total XP */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-center text-lg font-bold text-blue-300">
              Total XP Available: <span className="text-2xl text-blue-400">75 XP</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* PAYMENT CASHOUT MODAL */}
      <Dialog open={cashoutOpen} onOpenChange={setCashoutOpen}>
        <DialogContent className="bg-[#07182B] border-white/10 text-white max-w-md">
          <button
            onClick={() => setCashoutOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          <DialogHeader className={cashoutStep === 2 ? "hidden" : ""}>
            <DialogTitle className="text-2xl font-bold text-center">Payment Method</DialogTitle>
          </DialogHeader>

          {/* STEP 1: PAYMENT METHOD SELECTION */}
          {cashoutStep === 1 && (
            <div className="flex flex-col gap-6 mt-4">
              {/* Payment Breakdown */}
              <div className="flex flex-col gap-3 p-4 trust-card">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">You'll Receive</p>
                  <p className="text-lg font-bold text-green-400">${dollarValue}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">Network Fee (Gas Fee)</p>
                  <p className="text-sm font-semibold text-orange-400">${gasFee}</p>
                </div>

                <div className="h-px bg-white/10"></div>

                <div className="flex justify-between items-center">
                  <p className="text-base font-semibold">Minimum Received</p>
                  <p className="text-xl font-bold text-blue-400">${minimumReceived}</p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-gray-300">Select Payment Method</p>

                {/* Cryptomus Option */}
                <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-xl border-2 border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    {/* Cryptomus Logo Placeholder */}
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Wallet className="text-blue-400" size={24} />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">Cryptomus</p>
                      <p className="text-xs text-gray-400">Fast & Reliable</p>
                    </div>
                  </div>

                  {/* Blue Checkmark */}
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base font-semibold"
                onClick={() => setCashoutStep(2)}
              >
                Continue
              </Button>
            </div>
          )}

          {/* STEP 2: PAYMENT DETAILS */}
          {cashoutStep === 2 && (
            <div className="flex flex-col gap-5 mt-2">
              {/* Custom Header for Step 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCashoutStep(1)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-gray-400" />
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Wallet size={16} className="text-blue-400" />
                      <span className="font-bold text-lg">Cryptomus</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Total Fee</span>
                  <p className="text-sm font-bold text-white">${gasFee} USD</p>
                </div>
              </div>

              {/* Expiration Timer */}
              <div className="flex items-center gap-3 p-3 trust-card">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                    <circle cx="16" cy="16" r="14" stroke="#1f2937" strokeWidth="3" fill="none" />
                    <circle
                      cx="16" cy="16" r="14"
                      stroke="#3b82f6" strokeWidth="3" fill="none"
                      strokeDasharray="88"
                      strokeDashoffset={88 - (88 * timeLeft / 1800)}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="text-[10px] font-bold">{Math.ceil(timeLeft / 60)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Expiration time</span>
                  <span className="text-sm font-bold font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Step 2 Form */}
              <div className="flex flex-col gap-4">
                {/* Currency Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300">Select Currency</label>
                  <Select
                    value={selectedCurrency}
                    onValueChange={(val) => {
                      setSelectedCurrency(val);
                      setSelectedNetwork(""); // Reset network on currency change
                      setWalletAddress(""); // Reset address
                      setSelectedNetworkObj(null); // Reset network object
                    }}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                      <SelectValue placeholder="Choose currency..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A2333] border-white/10 text-white max-h-[200px]">
                      {currencies.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="focus:bg-white/10 focus:text-white cursor-pointer">
                          {c.name} ({c.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Network Selection (Only if currency selected) */}
                {selectedCurrency && (
                  <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-semibold text-gray-300">Select Network</label>
                    <Select
                      value={selectedNetwork}
                      onValueChange={(value) => {
                        const currency = currencies.find(c => c.code === selectedCurrency);
                        const network = currency?.networks.find(n => n.name === value);
                        setSelectedNetwork(value);
                        setSelectedNetworkObj(network || null);
                      }}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                        <SelectValue placeholder="Choose network..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A2333] border-white/10 text-white">
                        {currencies.find(c => c.code === selectedCurrency)?.networks.map((net) => (
                          <SelectItem key={net.name} value={net.name} className="focus:bg-white/10 focus:text-white cursor-pointer">
                            {net.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Proceed Button */}
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedCurrency || !selectedNetwork}
                  onClick={() => setCashoutStep(3)}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: WALLET ADDRESS & CONFIRMATION */}
          {cashoutStep === 3 && (
            <div className="flex flex-col gap-5 mt-2">
              {/* Custom Header for Step 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCashoutStep(2)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-gray-400" />
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Send Payment</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Total Fee</span>
                  <p className="text-sm font-bold text-white">${gasFee} USD</p>
                </div>
              </div>

              {/* Expiration Timer (Persisted) */}
              <div className="flex items-center gap-3 p-3 trust-card">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                    <circle cx="16" cy="16" r="14" stroke="#1f2937" strokeWidth="3" fill="none" />
                    <circle
                      cx="16" cy="16" r="14"
                      stroke="#3b82f6" strokeWidth="3" fill="none"
                      strokeDasharray="88"
                      strokeDashoffset={88 - (88 * timeLeft / 1800)}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="text-[10px] font-bold">{Math.ceil(timeLeft / 60)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Expiration time</span>
                  <span className="text-sm font-bold font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Wallet Address Display */}
              {selectedNetworkObj && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300">Wallet Address ({selectedNetworkObj.name})</label>
                    <div className="relative">
                      <div className="flex items-center justify-between trust-card p-3 pr-10 overflow-hidden">
                        <p className="text-sm font-mono text-gray-300 break-all">
                          {selectedNetworkObj.address}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedNetworkObj.address)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/10 transition-colors"
                        title="Copy to clipboard"
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 flex items-start gap-2 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <Info size={14} className="mt-0.5 flex-shrink-0 text-yellow-500" />
                    <p>Please ensure you send <strong>{selectedCurrency}</strong> on the <strong>{selectedNetworkObj.name}</strong> network. Sending funds to the wrong network may result in permanent loss.</p>
                  </div>

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-base font-semibold mt-2"
                    onClick={() => setCashoutOpen(false)}
                  >
                    I Have Made Payment
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* REFERRAL MODAL */}
      <Dialog open={referralOpen} onOpenChange={setReferralOpen}>
        <DialogContent className="bg-[#07182B] border-white/10 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-center">
              <Share2 className="text-blue-400" size={24} />
              Referral Program
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6 mt-2">

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                <Users size={32} className="text-blue-400" />
              </div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm font-medium text-gray-300">Friends invited</p>
              <p className="text-xs text-gray-400">Invite more friends to earn bonus rewards!</p>
            </div>

            {/* Referral Link */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Referral Link</label>
              <div className="relative">
                <div className="flex items-center justify-between trust-card p-4 pr-12">
                  <p className="text-sm font-mono text-gray-400 italic">Coming soon..</p>
                </div>
                <button
                  onClick={() => copyToClipboard("Coming soon..")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title="Copy link"
                >
                  {isCopied ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* How it works */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">How it works</h3>

              <div className="flex flex-col gap-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                    1
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-sm">Copy your referral link</p>
                    <p className="text-xs text-gray-400">Share it with your friends</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                    2
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-sm">Friends join using your link</p>
                    <p className="text-xs text-gray-400">They signup and start earning</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                    3
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-sm">Earn bonus rewards</p>
                    <p className="text-xs text-gray-400">Get XP for each friend who joins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 py-6 border-white/10 bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all group"
                onClick={() => window.open("https://twitter.com", "_blank")}
              >
                <Twitter size={20} className="text-gray-400 group-hover:text-[#1DA1F2]" />
                <span>Twitter</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 py-6 border-white/10 bg-white/5 hover:bg-[#0088cc]/20 hover:text-[#0088cc] hover:border-[#0088cc]/50 transition-all group"
                onClick={() => window.open("https://telegram.org", "_blank")}
              >
                <MessageCircle size={20} className="text-gray-400 group-hover:text-[#0088cc]" />
                <span>Telegram</span>
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
