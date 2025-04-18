'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useEffect, useState} from 'react';

export default function AnalyticsPage() {
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
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          View analytics for your content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Number of posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Likes</CardTitle>
            <CardDescription>Number of likes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{likeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reach</CardTitle>
            <CardDescription>Reach of posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reachCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
