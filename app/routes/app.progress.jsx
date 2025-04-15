import { useState } from 'react';
import { Page, Layout, Button, ProgressBar } from '@shopify/polaris';
import { authenticate } from '../shopify.server';
import { useSubmit, useFetcher } from '@remix-run/react';
import React from 'react';

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const simulateProcess = async () => {
  for (let i = 1; i <= 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(i);
  }
}

export const action = async ({ request }) => {
  await authenticate.admin(request);
  await simulateProcess();
  return { success: true };
};

export default function ProgressPage() {
  const [progress, setProgress] = useState(0);
  const submit = useSubmit();
  const fetcher = useFetcher();
  const isRunning = fetcher.state === 'submitting';
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
              disabled={isRunning}
            >
              {isRunning ? 'Processing...' : 'Start Process'}
            </Button>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 