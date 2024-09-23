let subsetsData = [];
let treeData = {
    name: 'Root',
    children: []
};

function findSubsets() {
    // Retrieve and parse input values
    const numbersInput = document.getElementById('numbers').value;
    const targetInput = document.getElementById('target').value;
    
    if (numbersInput.trim() === '' || targetInput.trim() === '') {
        alert('Please enter both numbers and target sum.');
        return;
    }

    const numbers = numbersInput.split(',').map(num => parseInt(num.trim()));
    const target = parseInt(targetInput.trim());
    
    if (numbers.some(isNaN) || isNaN(target)) {
        alert('Please enter valid integers.');
        return;
    }

    // Reset tree data
    treeData = { name: 'Root', children: [] };

    // Find subsets
    const results = findSubsetsRecursive(numbers, target);
    subsetsData = results; // Save subsets data for graph

    // Display results
    const resultsElement = document.getElementById('results');
    if (results.length === 0) {
        resultsElement.textContent = 'No subset found.';
    } else {
        resultsElement.textContent = 'Subsets that sum to ' + target + ':\n' + results.map(subset => `[${subset.join(', ')}]`).join('\n');
    }
}

function findSubsetsRecursive(nums, target) {
    const results = [];

    function backtrack(start, path, currentSum, node) {
        if (currentSum === target) {
            results.push([...path]);
            return;
        }
        if (currentSum > target) return;

        for (let i = start; i < nums.length; i++) {
            const childNode = { name: `${nums[i]}`, children: [] };
            node.children.push(childNode);
            path.push(nums[i]);
            backtrack(i + 1, path, currentSum + nums[i], childNode);
            path.pop();
        }
    }

    backtrack(0, [], 0, treeData);
    return results;
}

function showTree() {
    if (subsetsData.length === 0) {
        alert('Please calculate subsets first.');
        return;
    }

    // Redirect to the tree visualization page with tree data as a query parameter
    const encodedTreeData = encodeURIComponent(JSON.stringify(treeData));
    window.location.href = `tree.html?data=${encodedTreeData}`;
}
