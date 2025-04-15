import { useState, useEffect } from 'react';
import { Page, Layout, Button, ProgressBar } from '@shopify/polaris';
import { authenticate } from '../shopify.server';
import { useSubmit } from '@remix-run/react';
import { io } from 'socket.io-client';
import React from 'react';
import { broadcastProgress } from '../socket.server';

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const simulateProcess = async () => {
  for (let i = 1; i <= 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const progress = i * 10;
    console.log(`Sending progress: ${progress}%`);

    await pusher.trigger('progress-channel', 'progress-update', {
      progress,
    });
  }

  return 100;
};

export const action = async ({ request }) => {
  await authenticate.admin(request);
  const result = await simulateProcess();
  return { success: true, result };
};

export default function ProgressPage() {
  const [progress, setProgress] = useState(0);
  const [socket, setSocket] = useState(null);
  const submit = useSubmit();

  useEffect(() => {
    const pusher = new Pusher('f17237a18a493b9393f8', {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('progress-channel');

    channel.bind('progress-update', (data) => {
      setProgress(data.progress);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const handleSubmit = () => {
    submit(null, { method: 'post' });
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <ProgressBar progress={progress} size="large" />
            </div>
            <Button
              primary
              onClick={handleSubmit}
              disabled={progress > 0 && progress < 100}
            >
              {progress > 0 && progress < 100 ? 'Processing...' : 'Start Process'}
            </Button>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 