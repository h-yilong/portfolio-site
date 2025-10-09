"use client";

import { useEffect, useState } from "react";

interface ResourceEntry {
  url: string;
  type: string;
  size: number;
  cached: boolean;
  duration: number;
  method: 'preload' | 'fetch' | 'img' | 'three.js' | 'unknown';
}

export function ResourceLoadMonitor() {
  const [resources, setResources] = useState<ResourceEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [duplicates, setDuplicates] = useState<string[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const checkResources = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const resourceMap = new Map<string, ResourceEntry[]>();
      const newResources: ResourceEntry[] = [];

      entries.forEach((entry) => {
        // 只关注图片资源
        if (!entry.name.match(/\.(webp|jpg|jpeg|png|gif|svg)$/i)) return;

        const url = new URL(entry.name).pathname;
        const resource: ResourceEntry = {
          url,
          type: entry.initiatorType,
          size: entry.transferSize,
          cached: entry.transferSize === 0,
          duration: entry.duration,
          method: determineLoadMethod(entry),
        };

        newResources.push(resource);

        // 检查重复加载
        if (!resourceMap.has(url)) {
          resourceMap.set(url, []);
        }
        resourceMap.get(url)?.push(resource);
      });

      // 找出重复加载的资源
      const dupes: string[] = [];
      resourceMap.forEach((entries, url) => {
        if (entries.length > 1) {
          // 检查是否真的是重复加载（不是缓存命中）
          const nonCachedLoads = entries.filter(e => !e.cached);
          if (nonCachedLoads.length > 1) {
            dupes.push(url);
          }
        }
      });

      setResources(newResources);
      setDuplicates(dupes);
    };

    // 定期检查
    const interval = setInterval(checkResources, 2000);

    // 3秒后显示
    setTimeout(() => {
      setIsVisible(true);
      checkResources();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const image0Loads = resources.filter(r => r.url.includes('Image_0.webp'));
  const hasDuplicateLoads = image0Loads.filter(r => !r.cached).length > 1;

  return (
    <div className="fixed left-4 bottom-4 z-50 max-w-2xl rounded-lg bg-black/90 p-4 font-mono text-sm text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Resource Load Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-xs text-gray-400 hover:text-white"
        >
          Hide
        </button>
      </div>

      {/* 重复加载警告 */}
      {duplicates.length > 0 && (
        <div className="mb-4 rounded bg-red-900/50 p-3 text-xs">
          <div className="mb-2 font-bold text-red-300">⚠️ Duplicate Loads Detected:</div>
          {duplicates.map((url, i) => {
            const loads = resources.filter(r => r.url === url && !r.cached);
            return (
              <div key={i} className="mb-2">
                <div className="text-red-200">{url.split('/').pop()}</div>
                <div className="ml-4 space-y-1">
                  {loads.map((load, j) => (
                    <div key={j} className="text-xs text-gray-300">
                      Load #{j + 1}: {load.method} - {(load.size / 1024).toFixed(1)}KB - {load.duration.toFixed(0)}ms
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image_0.webp 详细信息 */}
      {image0Loads.length > 0 && (
        <div className={`mb-4 rounded p-3 text-xs ${hasDuplicateLoads ? 'bg-orange-900/50' : 'bg-green-900/50'}`}>
          <div className="mb-2 font-bold">
            {hasDuplicateLoads ? '⚠️' : '✅'} Image_0.webp Loads ({image0Loads.length}):
          </div>
          {image0Loads.map((load, i) => (
            <div key={i} className="mb-1 flex justify-between">
              <span>
                {load.method} {load.cached ? '(cached)' : '(network)'}
              </span>
              <span>
                {(load.size / 1024).toFixed(1)}KB - {load.duration.toFixed(0)}ms
              </span>
            </div>
          ))}

          {hasDuplicateLoads && (
            <div className="mt-2 border-t border-orange-600 pt-2 text-orange-200">
              <div className="font-semibold">Problem:</div>
              <div>React preload and Three.js loader use different CORS settings</div>
              <div className="mt-1 font-semibold">Solution:</div>
              <div>Remove preload from page.tsx, use useGLTF.preload() only</div>
            </div>
          )}
        </div>
      )}

      {/* 所有图片资源 */}
      <div className="max-h-64 overflow-y-auto text-xs">
        <div className="mb-2 font-semibold">All Image Resources:</div>
        {resources.map((resource, i) => (
          <div
            key={i}
            className={`mb-1 flex justify-between ${resource.cached ? 'text-gray-400' : 'text-white'}`}
          >
            <span className="truncate" title={resource.url}>
              {resource.url.split('/').pop()}
            </span>
            <span className="ml-2 shrink-0">
              {resource.cached ? '💾' : '🌐'} {(resource.size / 1024).toFixed(1)}KB
            </span>
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="mt-4 border-t border-gray-600 pt-2 text-xs">
        <div className="flex justify-between">
          <span>Total Resources:</span>
          <span>{resources.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Cached:</span>
          <span className="text-green-400">{resources.filter(r => r.cached).length}</span>
        </div>
        <div className="flex justify-between">
          <span>Network:</span>
          <span className="text-orange-400">{resources.filter(r => !r.cached).length}</span>
        </div>
        <div className="flex justify-between">
          <span>Duplicates:</span>
          <span className={duplicates.length > 0 ? 'text-red-400' : 'text-green-400'}>
            {duplicates.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function determineLoadMethod(entry: PerformanceResourceTiming): ResourceEntry['method'] {
  const type = entry.initiatorType;

  if (type === 'link') return 'preload';
  if (type === 'fetch') return 'fetch';
  if (type === 'img') return 'img';
  if (type === 'xmlhttprequest') return 'three.js';

  return 'unknown';
}

// Hook to check for duplicate loads
export function useDuplicateLoadDetector(resourceUrl: string) {
  const [loadCount, setLoadCount] = useState(0);
  const [isOptimal, setIsOptimal] = useState(true);

  useEffect(() => {
    const checkDuplicates = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const matches = entries.filter(e => e.name.includes(resourceUrl));
      const nonCachedLoads = matches.filter(e => e.transferSize > 0);

      setLoadCount(nonCachedLoads.length);
      setIsOptimal(nonCachedLoads.length <= 1);

      if (nonCachedLoads.length > 1 && process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ ${resourceUrl} loaded ${nonCachedLoads.length} times from network!`);
        console.table(nonCachedLoads.map(e => ({
          url: e.name,
          type: e.initiatorType,
          size: `${(e.transferSize / 1024).toFixed(1)}KB`,
          duration: `${e.duration.toFixed(0)}ms`,
        })));
      }
    };

    const timer = setTimeout(checkDuplicates, 3000);
    return () => clearTimeout(timer);
  }, [resourceUrl]);

  return { loadCount, isOptimal };
}
