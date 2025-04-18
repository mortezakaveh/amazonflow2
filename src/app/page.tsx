'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {BarChart, Home, ListPlus} from 'lucide-react';
import {useEffect, useState} from 'react';

export default function HomePage() {
  const [postCount, setPostCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [reachCount, setReachCount] = useState(0);

  // Placeholder function to simulate fetching analytics data
  useEffect(() => {
    // Simulate fetching data from an API or database
    setTimeout(() => {
      setPostCount(120);
      setLikeCount(540);
      setReachCount(12000);
    }, 1000);
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild href="/">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild href="/feeds">
                <ListPlus className="mr-2 h-4 w-4" />
                <span>Feeds</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild href="/analytics">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
          <h1 className="text-2xl font-bold">ContentPilot</h1>
          <p className="text-muted-foreground">
            Automate your content marketing workflow.
          </p>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
