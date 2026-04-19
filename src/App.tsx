import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlaneTakeoff, 
  Hotel, 
  MapPin, 
  UtensilsCrossed, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  Circle,
  Navigation,
  Train,
  Ship,
  Info,
  ChevronDown,
  ChevronUp,
  Phone,
  Globe
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  itineraryData, 
  splitPathData, 
  preparationTasks, 
  flightData
} from './data';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(itineraryData[0].dateId);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showHotelInfo, setShowHotelInfo] = useState(false);
  const [isFlightExpanded, setIsFlightExpanded] = useState(false);

  // Compute all tasks flattened
  const allTaskItems = preparationTasks.flatMap(c => c.items);

  // Load completed tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedTasks');
    if (saved) {
      try {
        setCompletedTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save completed tasks
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const selectedItinerary = itineraryData.find(d => d.dateId === selectedDate) || itineraryData[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans pb-24 mx-auto max-w-md shadow-2xl relative">
      
      {/* Sticky Header with Cover Image and Title */}
      <header className="sticky top-0 z-30 bg-white shadow-sm shrink-0 h-32 w-full overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 bg-slate-900/40 z-10" />
        <img 
          src="/cover.jpg" 
          alt="Xiamen Twin Towers" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/xiamen/800/400"
          }}
        />
        <div className="relative z-20 p-5 pb-4">
          <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md flex items-baseline gap-2">
            廈門行 
            <span className="text-orange-400 text-2xl drop-shadow-sm font-bold">Rundown</span>
          </h1>
          <p className="text-white/90 font-medium text-xs flex items-center mt-1 drop-shadow-sm">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            4/28 (三) - 5/2 (日)
          </p>
        </div>
      </header>

      {/* Main Stats / Quick Actions Area (Scrollable under header) */}
      <div className="px-5 pt-6 pb-4 bg-[#FDFBF7]">
        {/* Action Buttons Row */}
        <div className="flex gap-3 mb-6">
          <button 
            onClick={() => setShowChecklist(true)}
            className="flex-1 bg-orange-100 hover:bg-orange-200 transition-colors text-orange-700 py-3 rounded-2xl flex flex-col items-center justify-center gap-1"
          >
            <div className="font-bold text-lg">{completedTasks.length}/{allTaskItems.length}</div>
            <div className="text-xs font-semibold">行前準備與預約</div>
          </button>
          
          <button 
            onClick={() => setShowHotelInfo(true)}
            className="flex-1 bg-blue-50 hover:bg-blue-100 transition-colors py-3 rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95"
          >
            <Hotel className="w-5 h-5 text-blue-600 mb-1" />
            <div className="text-xs font-semibold text-blue-800">翔鷺國際大酒店</div>
          </button>
        </div>

        {/* Flight Info compact */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
          <button 
            onClick={() => setIsFlightExpanded(!isFlightExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="w-5 h-5 text-slate-500" />
              <span className="font-bold text-slate-700 text-sm">航班資訊及時刻</span>
            </div>
            {isFlightExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          
          <AnimatePresence>
            {isFlightExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 space-y-4 pt-1"
              >
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 shrink-0" />
                  <div className="text-sm w-full">
                    <div className="font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>我的航班 <span className="text-slate-400 font-medium text-xs ml-1">(AE765)</span></span>
                    </div>
                    <div className="text-slate-600 text-xs space-y-1.5 w-full">
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-bold text-slate-400 bg-slate-200 text-[10px] px-1 py-0.5 rounded text-center">去</span>
                        <span className="font-mono text-slate-800">4/28 11:05</span>
                        <span className="text-slate-500">台中 (RMQ)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-bold text-slate-400 bg-slate-200 text-[10px] px-1 py-0.5 rounded text-center">回</span>
                        <span className="font-mono text-slate-800">5/02 09:10</span>
                        <span className="text-slate-500">金門 (KNH)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-slate-200 w-full ml-8" />
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 shrink-0" />
                  <div className="text-sm w-full">
                    <div className="font-bold text-slate-700 mb-1.5">父母航班</div>
                    <div className="text-slate-600 text-xs space-y-1.5 w-full">
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-bold text-slate-400 bg-slate-200 text-[10px] px-1 py-0.5 rounded text-center">去</span>
                        <span className="font-mono text-slate-800">4/28 13:00</span>
                        <span className="text-slate-500">松山 (TSA)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-bold text-slate-400 bg-slate-200 text-[10px] px-1 py-0.5 rounded text-center">回</span>
                        <span className="font-mono text-slate-800">5/02 12:15</span>
                        <span className="text-slate-500">金門 (KNH)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Tabs (Sticky beneath Cover) */}
      <div className="sticky top-32 z-20 bg-[#FDFBF7]/95 backdrop-blur-md pt-3 pb-2 px-2 border-b border-t border-slate-200/50 shadow-sm">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 px-3 pb-2 snap-x">
          {itineraryData.map(day => {
            const isSelected = selectedDate === day.dateId;
            return (
              <button
                key={day.dateId}
                onClick={() => setSelectedDate(day.dateId)}
                className={cn(
                  "flex-shrink-0 snap-center rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                  isSelected 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105" 
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                )}
              >
                {day.dateStr} <span className={cn("ml-1 font-normal opacity-75", isSelected && "opacity-100")}>{day.dayOfWeek}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="px-5 pt-6 relative min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Warnings */}
            {selectedItinerary.warnings && selectedItinerary.warnings.map((warn, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 shadow-sm text-amber-900">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
                <p className="text-sm font-medium leading-relaxed">{warn}</p>
              </div>
            ))}

            {/* Timeline Items */}
            <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-[21px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-200">
              {selectedItinerary.items.map((item, idx) => (
                <div key={item.id} className="relative z-10 pl-6">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute left-[-11px] top-1 w-7 h-7 rounded-full border-4 border-[#FDFBF7] flex items-center justify-center",
                    item.type === 'split' ? "bg-orange-500" : "bg-slate-900"
                  )}>
                    {item.type === 'split' ? <Navigation className="w-3 h-3 text-white" /> : <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-md",
                      item.type === 'split' ? "bg-orange-100 text-orange-700" : "bg-slate-200 text-slate-700"
                    )}>
                      {item.timeLabel}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 leading-none">{item.title}</h3>
                    {item.tags && item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded border border-pink-200 shrink-0 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-slate-700 whitespace-pre-line leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {item.food && (
                      <div className="flex items-start gap-3 bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
                        <UtensilsCrossed className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-orange-800">
                          {item.food}
                        </p>
                      </div>
                    )}

                    {item.advice && (
                      <div className="flex items-start gap-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-indigo-800 leading-relaxed">
                          {item.advice}
                        </p>
                      </div>
                    )}

                    {item.links && item.links.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {item.links.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors"
                          >
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Render me path inline if it's the 14:00 split item */}
                    {item.id === '01-2' && (
                      <div className="mt-2 space-y-4 pt-4 border-t border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">【你的路徑：回台】</span>
                          </div>
                          <div className="space-y-3 pl-2 border-l-2 border-blue-100">
                            {splitPathData.me.map((step, i) => (
                              <div key={i} className="text-sm">
                                <span className="font-bold text-slate-900 mr-2">{step.time}</span>
                                <span className="text-slate-600">{step.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Render family path inline if it's the Quanzhou item */}
                    {item.id === '01-3' && (
                      <div className="mt-2 space-y-4 pt-4 border-t border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">【家人路徑：泉州】</span>
                          </div>
                          <div className="space-y-3 pl-2 border-l-2 border-emerald-100">
                            {splitPathData.family.map((step, i) => (
                              <div key={i} className="text-sm">
                                <span className="font-bold text-slate-900 mr-2">{step.time}</span>
                                <span className="text-slate-600">{step.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* End of Day Padding */}
            <div className="h-8" />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Checklist Overlay */}
      <AnimatePresence>
        {showChecklist && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChecklist(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              
              // === 手勢邏輯 ===
              drag="y" // 限制只能在 Y 軸（上下）拖曳
              dragConstraints={{ top: 0 }} // 限制面板不能往上拉超過原始位置
              dragElastic={{ top: 0, bottom: 0.4 }} // 往下拖曳時給予 0.4 的彈性阻尼感，避免手感生硬
              onDragEnd={(event, info) => {
                // 實務判定：當下滑位移超過 100px，或是往下的甩動速度大於 500 時，判定為使用者想關閉
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowChecklist(false);
                }
              }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] shadow-2xl z-50 p-6 pb-12 flex flex-col max-h-[85vh]"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
              <h2 className="text-xl font-bold mb-4 shrink-0">行前準備與預約確認</h2>
              <div className="space-y-6 overflow-y-auto hide-scrollbar pb-6 px-1 flex-1">
                {preparationTasks.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-slate-500 text-sm mb-3 pl-1">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map(task => {
                        const isChecked = completedTasks.includes(task.id);
                        return (
                          <button
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={cn(
                              "w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left border relative overflow-hidden",
                              isChecked ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200 shadow-sm hover:border-orange-300"
                            )}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                              <span className={cn(
                                "font-bold text-[15px]",
                                isChecked ? "text-slate-400 line-through" : "text-slate-800"
                              )}>
                                {task.title}
                              </span>
                              <span className={cn(
                                "text-xs leading-relaxed",
                                isChecked ? "text-slate-400" : "text-slate-500"
                              )}>
                                {task.instruction}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowChecklist(false)}
                className="w-full mt-4 shrink-0 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg"
              >
                收起清單
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hotel Info Overlay */}
      <AnimatePresence>
        {showHotelInfo && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHotelInfo(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowHotelInfo(false);
                }
              }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] shadow-2xl z-50 p-6 pb-12 flex flex-col"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Hotel className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">翔鷺國際大酒店</h2>
                  <p className="text-sm text-slate-500 font-medium">Xianglu Grand Hotel</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a href="https://maps.apple.com/?q=中國福建省廈門市湖里區長浩路+18+號" target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-1">地址</div>
                    <div className="text-sm font-medium text-slate-800 leading-relaxed">
                      中國福建省廈門市湖里區長浩路 18 號<br/>
                      <span className="text-slate-500 text-xs">（郵遞區號：361006）</span>
                    </div>
                  </div>
                </a>

                <a href="tel:+865922638888" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-0.5">電話</div>
                    <div className="text-sm font-bold text-blue-600">+86 592 263 8888</div>
                  </div>
                </a>

                <a href="http://www.xianglugrand.com/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <Globe className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-0.5">官方網站</div>
                    <div className="text-sm font-bold text-blue-600">www.xianglugrand.com</div>
                  </div>
                </a>
              </div>
              
              <button 
                onClick={() => setShowHotelInfo(false)}
                className="w-full mt-6 shrink-0 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              >
                關閉
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
