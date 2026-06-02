"use client";

import { useState } from "react";
import { SessionSidebar } from "@/components/sidebar/SessionSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { PromptTemplates } from "@/components/panels/PromptTemplates";
import { MemoryPanel } from "@/components/panels/MemoryPanel";
import { ToolCallTimeline } from "@/components/panels/ToolCallTimeline";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ProviderSelector } from "@/components/ui/ProviderSelector";
import { MobileDrawer } from "@/components/ui/MobileDrawer";
import { useChat } from "@/hooks/useChat";
import { useProvider } from "@/hooks/useProvider";
import type { PromptTemplate } from "@/lib/types";

export function AppShell() {
  const {
    hydrated,
    sessions,
    activeSession,
    activeId,
    memory,
    isStreaming,
    streamContent,
    liveTools,
    selectSession,
    newSession,
    deleteSession,
    sendMessage,
    updateMemory,
  } = useChat();

  const { provider, setProvider, available, loaded: providerLoaded } = useProvider();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleTemplate = (tpl: PromptTemplate, simulateTools?: boolean) => {
    sendMessage(tpl.prompt, { simulateTools, provider });
    setPanelOpen(false);
  };

  const handleSend = (text: string) => {
    sendMessage(text, { provider });
  };

  const displayTools = isStreaming ? liveTools : activeSession?.toolCalls ?? [];

  const rightPanel = (
    <div className="flex flex-col gap-4">
      <ProviderSelector value={provider} available={available} onChange={setProvider} />
      <hr className="border-surface-border" />
      <PromptTemplates onSelect={handleTemplate} disabled={isStreaming} />
      <hr className="border-surface-border" />
      <ToolCallTimeline tools={displayTools} live={isStreaming && liveTools.length > 0} />
      <hr className="border-surface-border" />
      <MemoryPanel items={memory} onChange={updateMemory} />
    </div>
  );

  if (!hydrated || !providerLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface text-content-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Loading AI UX Lab…
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-content">
      <div className="hidden lg:flex">
        <SessionSidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={selectSession}
          onNew={newSession}
          onDelete={deleteSession}
        />
      </div>

      <MobileDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} side="left">
        <SessionSidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={(id) => {
            selectSession(id);
            setSidebarOpen(false);
          }}
          onNew={() => {
            newSession();
            setSidebarOpen(false);
          }}
          onDelete={deleteSession}
          embedded
        />
      </MobileDrawer>

      <MobileDrawer
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        side="right"
        title="Panels"
      >
        {rightPanel}
      </MobileDrawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-surface-border px-3 py-2 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-surface-border px-3 py-1.5 text-xs text-content-muted"
          >
            Chats
          </button>
          <span className="text-sm font-medium text-content">AI UX Lab</span>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="rounded-lg border border-surface-border px-3 py-1.5 text-xs text-content-muted"
            >
              Panels
            </button>
          </div>
        </div>

        <ChatWindow
          session={activeSession}
          isStreaming={isStreaming}
          streamContent={streamContent}
          liveTools={liveTools}
          onSend={handleSend}
          provider={provider}
          headerRight={
            <div className="hidden items-center gap-2 lg:flex">
              <ProviderSelector
                value={provider}
                available={available}
                onChange={setProvider}
                compact
              />
              <ThemeToggle />
            </div>
          }
        />
      </div>

      <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto border-l border-surface-border bg-surface-raised p-4 lg:flex">
        {rightPanel}
      </aside>
    </div>
  );
}
