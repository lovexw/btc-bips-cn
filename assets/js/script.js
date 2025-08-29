document.addEventListener('DOMContentLoaded', function() {
  // 加载 BIP 数据
  loadBipData();
  
  // 初始化筛选功能
  initFilters();
  
  // 搜索功能
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function() {
      applyFilters();
    });
  }
  
  // 高亮当前页面对应的导航链接
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
  
  // 添加返回顶部按钮
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.title = '返回顶部';
  document.body.appendChild(backToTopButton);
  
  // 当用户滚动超过300px时显示按钮
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // 点击按钮返回顶部
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 为表格添加排序功能
  initTableSorting();
  
  // 加载 BIP 数据函数
  function loadBipData() {
    fetch('assets/data/bips.json')
      .then(response => response.json())
      .then(data => {
        populateBipTable(data);
      })
      .catch(error => {
        console.error('加载 BIP 数据时出错:', error);
      });
  }
  
  // 填充 BIP 表格
  function populateBipTable(bips) {
    const tableBody = document.getElementById('bip-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    bips.forEach(bip => {
      const row = document.createElement('tr');
      
      // BIP 编号
      const numberCell = document.createElement('td');
      const numberLink = document.createElement('a');
      const bipNumber = bip.number.toString().padStart(4, '0');
      numberLink.href = `bip-translations/bip-${bipNumber}.html`;
      numberLink.textContent = `BIP-${bip.number}`;
      numberCell.appendChild(numberLink);
      
      // 其他单元格
      const layerCell = document.createElement('td');
      layerCell.textContent = bip.layer || '';
      
      const typeCell = document.createElement('td');
      typeCell.textContent = bip.type || '';
      
      const statusCell = document.createElement('td');
      statusCell.textContent = bip.status || '';
      
      const titleCell = document.createElement('td');
      const titleText = bip.title || '';
      titleCell.textContent = titleText;
      // 为长标题添加 title 属性，鼠标悬停时显示完整内容
      titleCell.title = titleText;
      
      const authorCell = document.createElement('td');
      const authorText = bip.author || '';
      authorCell.textContent = authorText;
      // 为长作者名添加 title 属性
      authorCell.title = authorText;
      
      // 添加所有单元格到行
      row.appendChild(numberCell);
      row.appendChild(layerCell);
      row.appendChild(typeCell);
      row.appendChild(statusCell);
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      
      // 添加行到表格
      tableBody.appendChild(row);
    });
    
    // 初始应用筛选器
    applyFilters();
  }
  
  // 初始化筛选功能
  function initFilters() {
    const layerFilter = document.getElementById('layer-filter');
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const resetButton = document.getElementById('reset-filters');
    
    if (layerFilter) {
      layerFilter.addEventListener('change', applyFilters);
    }
    
    if (typeFilter) {
      typeFilter.addEventListener('change', applyFilters);
    }
    
    if (statusFilter) {
      statusFilter.addEventListener('change', applyFilters);
    }
    
    if (resetButton) {
      resetButton.addEventListener('click', function() {
        if (layerFilter) layerFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (statusFilter) statusFilter.value = '';
        if (searchInput) searchInput.value = '';
        applyFilters();
      });
    }
  }
  
  // 应用筛选器
  function applyFilters() {
    const searchInput = document.getElementById('search-input');
    const layerFilter = document.getElementById('layer-filter');
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const tableBody = document.getElementById('bip-table-body');
    
    if (!tableBody) return;
    
    const rows = tableBody.getElementsByTagName('tr');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const layerValue = layerFilter ? layerFilter.value : '';
    const typeValue = typeFilter ? typeFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName('td');
      
      // 检查是否匹配搜索词
      let matchesSearch = false;
      if (searchTerm === '') {
        matchesSearch = true;
      } else {
        for (let j = 0; j < cells.length; j++) {
          const cellText = cells[j].textContent.toLowerCase();
          if (cellText.indexOf(searchTerm) > -1) {
            matchesSearch = true;
            break;
          }
        }
      }
      
      // 检查是否匹配筛选条件
      const matchesLayer = layerValue === '' || cells[1].textContent === layerValue;
      const matchesType = typeValue === '' || cells[2].textContent === typeValue;
      const matchesStatus = statusValue === '' || cells[3].textContent === statusValue;
      
      // 显示或隐藏行
      if (matchesSearch && matchesLayer && matchesType && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  }
  
  // 初始化表格排序
  function initTableSorting() {
    const tables = document.querySelectorAll('table.sortable');
    
    tables.forEach(table => {
      const headers = table.querySelectorAll('th');
      
      headers.forEach((header, index) => {
        header.addEventListener('click', function() {
          sortTable(table, index, header);
        });
        header.style.cursor = 'pointer';
        header.title = '点击排序';
      });
    });
  }
  
  // 表格排序函数
  function sortTable(table, column, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 清除所有表头的排序类
    const headers = table.querySelectorAll('th');
    headers.forEach(h => {
      h.classList.remove('sort-asc', 'sort-desc');
    });
    
    // 确定排序方向
    let direction = 1; // 升序
    if (header.classList.contains('sort-asc')) {
      direction = -1; // 降序
      header.classList.remove('sort-asc');
      header.classList.add('sort-desc');
    } else {
      header.classList.remove('sort-desc');
      header.classList.add('sort-asc');
    }
    
    // 检查是否为数字列（BIP 编号）
    const isNumeric = column === 0;
    
    rows.sort((a, b) => {
      let aValue, bValue;
      
      if (column === 0) {
        // 特殊处理 BIP 编号列
        aValue = parseInt(a.cells[column].textContent.replace('BIP-', ''));
        bValue = parseInt(b.cells[column].textContent.replace('BIP-', ''));
      } else {
        aValue = a.cells[column].textContent.trim();
        bValue = b.cells[column].textContent.trim();
        
        if (!isNumeric) {
          return direction * aValue.localeCompare(bValue, 'zh-CN');
        }
      }
      
      return direction * (aValue - bValue);
    });
    
    // 清空表格并添加排序后的行
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    
    rows.forEach(row => {
      tbody.appendChild(row);
    });
  }
});