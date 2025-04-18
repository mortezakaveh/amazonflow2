'use client';

import {useState} from 'react';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {ListPlus} from 'lucide-react';

export default function FeedsPage() {
  const [rssFeedUrl, setRssFeedUrl] = useState('');
  const [merchantFeedUrl, setMerchantFeedUrl] = useState('');
  const {toast} = useToast();

  const handleAddRssFeed = () => {
    // TODO: Implement logic to add RSS feed to database or state
    console.log('Adding RSS feed:', rssFeedUrl);
    toast({
      title: 'RSS feed added!',
      description: `Successfully added RSS feed: ${rssFeedUrl}`,
    });
  };

  const handleAddMerchantFeed = () => {
    // TODO: Implement logic to add Google Merchant feed to database or state
    console.log('Adding Merchant feed:', merchantFeedUrl);
    toast({
      title: 'Merchant feed added!',
      description: `Successfully added Merchant feed: ${merchantFeedUrl}`,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Data Feeds</h1>
        <p className="text-muted-foreground">
          Connect to RSS feeds and Google Merchant XML product feeds.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>RSS Feed</CardTitle>
            <CardDescription>
              Connect to an RSS feed to import blog posts and articles.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="rss-feed-url">RSS Feed URL</Label>
              <Input
                id="rss-feed-url"
                placeholder="Enter RSS feed URL"
                value={rssFeedUrl}
                onChange={(e) => setRssFeedUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleAddRssFeed}>Add RSS Feed</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Merchant Feed</CardTitle>
            <CardDescription>
              Connect to a Google Merchant XML feed to import product data.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="merchant-feed-url">
                Google Merchant Feed URL
              </Label>
              <Input
                id="merchant-feed-url"
                placeholder="Enter Google Merchant feed URL"
                value={merchantFeedUrl}
                onChange={(e) => setMerchantFeedUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleAddMerchantFeed}>Add Merchant Feed</Button>
          </CardContent>
        </Card>
      </div>

      {/* TODO: Display added feeds in a list or table */}
    </div>
  );
}
