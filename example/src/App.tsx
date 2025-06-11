import React, { useState, useEffect } from 'react';
// 直接从源码导入，这样修改源码后刷新页面就能看到效果
import ReactWEditor from 'wangeditor-for-react';

const App: React.FC = () => {
  const [content, setContent] = useState('<p>Hello WangEditor!</p>');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (html: string) => {
    setContent(html);
    console.log('Content changed:', html);
  };

  if (!mounted) {
    return <div>Loading editor...</div>;
  }

  return (
    <div style={{ margin: '20px' }}>
      <h1>WangEditor For React 测试</h1>
      <div style={{ border: '1px solid #ccc', margin: '20px 0', padding: '10px' }}>
        <div style={{ height: '500px' }}>
          <ReactWEditor
            value={content}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ margin: '20px 0' }}>
        <h3>预览:</h3>
        <div
          style={{
            border: '1px solid #eee',
            padding: '20px',
            minHeight: '100px',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default App;
