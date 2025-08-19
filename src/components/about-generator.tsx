
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { handleGenerateAboutMe } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Skeleton } from './ui/skeleton';

const INITIAL_USER_DETAILS = `Shibam Das, a B.Tech student in Information Technology from Kolkata. Skilled in Python, Java, C++, and JavaScript. Proficient in web development technologies like React and Node.js. Experienced with AWS services, particularly in building automated ETL pipelines with AWS Glue. Has developed machine learning models for candlestick analysis and fraud detection. A proactive learner and collaborative team player, passionate about leveraging technology to create impactful and innovative solutions. Seeks to apply his skills in a challenging and dynamic software development role.`;

export default function AboutGenerator() {
  const [style, setStyle] = useState('professional');
  const [userDetails, setUserDetails] = useState(INITIAL_USER_DETAILS);
  const [generatedAboutMe, setGeneratedAboutMe] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onGenerate = () => {
    if (!userDetails) {
      toast({
        variant: 'destructive',
        title: 'User Details Required',
        description: 'Please enter some details about yourself before generating.',
      });
      return;
    }
    startTransition(async () => {
      setGeneratedAboutMe('');
      try {
        const result = await handleGenerateAboutMe({ style, userDetails });
        setGeneratedAboutMe(result.aboutMe);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error Generating Text',
          description: 'There was a problem generating the "About Me" text. Please try again.',
        });
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Powered "About Me"</CardTitle>
        <CardDescription>
          Edit your professional profile below, then select a tone and let AI craft a summary for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="userDetails">Your Professional Summary</Label>
          <Textarea
            id="userDetails"
            value={userDetails}
            onChange={(e) => setUserDetails(e.target.value)}
            className="min-h-[280px] text-base"
            rows={12}
            placeholder="Tell me about your skills, experience, and goals..."
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="style">Choose a Tone</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style" className="w-full">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={onGenerate} disabled={isPending} className="w-full bg-accent hover:bg-accent/90">
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Generate'
              )}
            </Button>
          </div>
          
          <div className="pt-2">
            {isPending && (
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
              </div>
            )}
            {generatedAboutMe && (
              <div className="space-y-2">
                <Label>Generated Text</Label>
                <Textarea
                  readOnly
                  value={generatedAboutMe}
                  className="min-h-[120px] bg-secondary/30 text-base"
                  rows={5}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
