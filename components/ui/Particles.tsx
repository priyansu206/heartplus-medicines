"use client"

import React, { useCallback, useEffect, useMemo, useRef, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("")
  }
  const hexInt = parseInt(hex, 16)
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255]
}

type Circle = {
  x: number; y: number; translateX: number; translateY: number
  size: number; alpha: number; targetAlpha: number
  dx: number; dy: number; magnetism: number
}

function remapValue(value: number, start1: number, end1: number, start2: number, end2: number): number {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh: _refresh,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const circles = useRef<Circle[]>([])
  const rawMouse = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const rafID = useRef<number | null>(null)
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canvasRect = useRef({ left: 0, top: 0, width: 0, height: 0 })
  const prefersReducedMotion = useRef(false)

  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio || 1, 2)
      : 1
  const rgb = useMemo(() => hexToRgb(color), [color])
  const rgbaPrefix = useMemo(() => `rgba(${rgb.join(", ")}, `, [rgb])

  const run = useCallback(() => {
    const canvas = canvasRef.current
    const container = canvasContainerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const circleParams = (): Circle => ({
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0, translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    })

    const drawCircle = (circle: Circle, update = false) => {
      const { x, y, translateX, translateY, size: s, alpha } = circle
      ctx.beginPath()
      ctx.arc(x + translateX, y + translateY, s, 0, 2 * Math.PI)
      ctx.fillStyle = rgbaPrefix + alpha + ")"
      ctx.fill()
      if (!update) circles.current.push(circle)
    }

    const clearContext = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }

    const initCanvas = () => {
      canvasSize.current.w = container.offsetWidth
      canvasSize.current.h = container.offsetHeight
      canvas.width = canvasSize.current.w * dpr
      canvas.height = canvasSize.current.h * dpr
      canvas.style.width = `${canvasSize.current.w}px`
      canvas.style.height = `${canvasSize.current.h}px`
      const rect = container.getBoundingClientRect()
      canvasRect.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
      circles.current = []
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams()
        drawCircle(circle)
      }
    }

    const animate = () => {
      clearContext()
      circles.current.forEach((circle: Circle, i: number) => {
        const closestEdge = Math.min(
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size
        )
        const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1)
        if (remapClosestEdge > 1) {
          circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge
        }
        circle.x += circle.dx + vx
        circle.y += circle.dy + vy
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease
        drawCircle(circle, true)
        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1)
          drawCircle(circleParams())
        }
      })
      rafID.current = window.requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      resizeTimeout.current = setTimeout(initCanvas, 200)
    }

    const handlePointerMove = (event: PointerEvent) => {
      rawMouse.current.x = event.clientX
      rawMouse.current.y = event.clientY
      const { left, top, width: w, height: h } = canvasRect.current
      const x = rawMouse.current.x - left - w / 2
      const y = rawMouse.current.y - top - h / 2
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }

    initCanvas()

    window.addEventListener("resize", handleResize)

    if (prefersReducedMotion.current) {
      return () => {
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
        window.removeEventListener("resize", handleResize)
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    animate()

    return () => {
      if (rafID.current != null) window.cancelAnimationFrame(rafID.current)
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [quantity, staticity, ease, size, vx, vy, dpr, rgbaPrefix])

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const cleanup = run()
    return () => { cleanup?.() }
  }, [run])

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
