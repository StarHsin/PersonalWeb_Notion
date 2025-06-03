import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function DynamicBackgrounds({ height }) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#1e293b", //slate-900
        },
      },
      fpsLimit: 120,
      interactivity: {
        //互動
        events: {
          onClick: {
            enable: true, // 啟用點擊事件
            mode: "push", // 點擊時會向畫面添加粒子
          },
          onHover: {
            enable: true, // 啟用懸停事件
            mode: "repulse", // 鼠標懸停時粒子會被推開
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          push: {
            quantity: 4, // 每次點擊會新增 4 顆粒子
          },
          repulse: {
            distance: 50, // 懸停時粒子會推開 200px
            duration: 0.4, // 推開效果持續 0.4 秒
          },
        },
      },
      particles: {
        //粒子設定
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none", // 粒子不朝任何特定方向移動
          enable: true, // 啟用粒子移動
          outModes: {
            default: "bounce", // 粒子會在畫面邊界反彈
          },
          random: false, // 粒子移動方向不隨機
          speed: 2, // 粒子移動速度
          straight: false, // 粒子移動不會直線前進
        },
        number: {
          density: {
            enable: true, // 啟用粒子密度控制
          },
          value: 50, // 預設粒子數量為 80
        },
        opacity: {
          value: 0.5, // 粒子的透明度為 0.5
          random: true, // 開啟隨機透明度，讓粒子看起來閃爍
          animation: {
            enable: true,
            speed: 1, // 透明度變化速度
            sync: false,
          },
        },
        shape: {
          type: "circle", // 粒子形狀為圓形
        },
        size: {
          value: { min: 1, max: 8 }, // 粒子大小範圍在 1 到 5 之間
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="absolute w-full -z-10" style={{ height: `${height}px` }}>
      <Particles options={options} />
    </div>
  );
}
