'use client'

import { Dialog, DialogContent } from './ui/dialog'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

interface ComingSoonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComingSoonModal({ open, onOpenChange }: ComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <div className="relative">
          {/* Police Salute Image */}
          <div className="relative w-full h-[400px] overflow-hidden">
            <Image
              src="/police-salute.png"
              alt="Police Officer Salute"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">Coming Soon!</h2>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-lg md:text-xl text-gray-200 font-medium">
              The course will be introduced soon. Stay tuned for comprehensive preparation materials!
            </p>
          </div>
        </div>
        
        {/* Additional Info Section */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
          <p className="text-center text-gray-700">
            We're working hard to bring you the best learning experience. 
            <span className="block mt-2 font-semibold text-red-600">
              BEWARE OF SCAM INSTITUTES
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

