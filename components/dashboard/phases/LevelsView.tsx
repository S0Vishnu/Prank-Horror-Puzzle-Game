import React from 'react';
import { LayoutTemplate, DoorOpen, Footprints, Eye, Zap, RefreshCw } from 'lucide-react';

export const LevelsView: React.FC = () => {
  const levels = [
    {
      id: 1,
      name: "Too Easy",
      icon: <DoorOpen className="w-5 h-5 text-emerald-400" />,
      desc: "The door is a cardboard cutout that falls over. Real exit is behind you.",
      narrator: "Competent. Barely."
    },
    {
      id: 2,
      name: "Repeat Offender",
      icon: <RefreshCw className="w-5 h-5 text-blue-400" />,
      desc: "Non-euclidean loop. Exit is in the ceiling, revealed by looking up for 3s.",
      narrator: "Again? Really?"
    },
    {
      id: 3,
      name: "Trust Issues",
      icon: <Footprints className="w-5 h-5 text-orange-400" />,
      desc: "Visible bridge has no collision. Invisible path revealed by flickering torch.",
      narrator: "Gravity works. Confirmed."
    },
    {
      id: 4,
      name: "Stop Trying",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      desc: "Door runs away from you. You must stand still for it to approach you.",
      narrator: "Why are you running?"
    },
    {
      id: 5,
      name: "Do The Opposite",
      icon: <Eye className="w-5 h-5 text-red-400" />,
      desc: "Narrator commands trigger death. You must disobey the explicit instruction.",
      narrator: "I lied."
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <LayoutTemplate className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">Level Design Manifest (5)</h2>
      </div>
      
      <p className="text-neutral-400 text-sm mb-6">
        Each level is designed to teach a specific "Prank Mechanic" that inverts standard game logic.
      </p>

      <div className="grid gap-4">
        {levels.map((level) => (
          <div key={level.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-indigo-900/20 transition-colors">
                  {level.icon}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-200">Level {level.id}: {level.name}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{level.desc}</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <span className="text-xs font-mono text-neutral-600 uppercase">Key Line</span>
                <p className="text-xs text-indigo-300 italic">"{level.narrator}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
