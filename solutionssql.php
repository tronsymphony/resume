<?php 
    $queryString = $_POST['search_string'];

	global $wpdb;

	$queryStringExploded = array_map('trim', explode(' ', $queryString));
	$qLength = count($queryStringExploded);

	$queryArray = array();
	for ($i=0; $i < $qLength; $i++) { 
		array_push($queryArray,"
			AND wp_terms.slug LIKE '%".$queryStringExploded[$i]."%' ");
	}

	$implodedArray = implode( " ", $queryArray );

	// SEARCH INSIGHTS/Monitor/Infographics
	$insightsQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id

		AND wp_posts.post_type IN ('insight','monitor','infographic')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		".$implodedArray."

		LIMIT 0, 10
	";
	// SEARCH INDUSTRIES
	$industriesQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id

		AND wp_posts.post_type IN ('industry')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		".$implodedArray."

		LIMIT 0, 10
	";
	// SEARCH SOLUTIONS
	$solutionsQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id

		AND wp_posts.post_type IN ('solution')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		".$implodedArray."

		LIMIT 0, 10
	";

	$insightPosts     = $wpdb->get_results( $insightsQuery );
	$indsutriesPosts  = $wpdb->get_results( $industriesQuery );
	$solutionsPosts   = $wpdb->get_results( $solutionsQuery );

?>

<?php if(empty($insightPosts) && empty($indsutriesPosts) && empty($solutionsPosts)){ ?>
	<div class="abouttagcontent">
		<div class="whitespacetag">
			<h2 class="serviceo">
				No Results
			</h2>	
			<div class="contentto">
				<p>
					If there's nothing here, try the main menu.
				</p>
			</div>
		</div>
	</div>
<?php } else { ?>
	<!-- ELSE STATEMENT -->
	<?php if(!empty($insightPosts)): ?>
		<div class="abouttagcontentinsigyhts">
			<div class="whitespacetag">
				<h2 class="serviceo">
					Insights
				</h2>	
				<div class="contentto">
					<ul class="popl">
						<?php for ($i=0; $i < count($insightPosts); $i++) {	?>
								<li class="listresult">
									<h2 class="postitle noresultso">
										<a href="<?php echo $insightPosts[$i]->guid; ?>">
											<?php $term_obj_list = get_the_terms( $insightPosts[$i]->ID, 'monitor-type' );
										$terms_string = join(', ', wp_list_pluck($term_obj_list, 'name'));
										 ?>
											<?php if(get_field('dates',$insightPosts[$i]->ID)){
												echo $terms_string ." - ".get_field('dates',$insightPosts[$i]->ID);
											} else {
												echo $insightPosts[$i]->post_title; 
											} 
											?>
										</a>
									</h2>
								</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<?php if(!empty($indsutriesPosts)): ?>
		<div class="abouttagcontentinsigyhts">
			<div class="whitespacetag">
				<h2 class="serviceo">
					Indsutries
				</h2>	
				<div class="contentto">
					<ul class="popl">
						<?php for ($i=0; $i < count($indsutriesPosts); $i++) {	?>
								<li class="listresult">
									<h2 class="postitle noresultso">
										<a href="<?php echo $indsutriesPosts[$i]->guid; ?>">
											<?php $term_obj_list = get_the_terms( $indsutriesPosts[$i]->ID, 'monitor-type' );
										$terms_string = join(', ', wp_list_pluck($term_obj_list, 'name'));
										 ?>
											<?php if(get_field('dates',$indsutriesPosts[$i]->ID)){
												echo $terms_string ." - ".get_field('dates',$indsutriesPosts[$i]->ID);
											} else {
												echo $indsutriesPosts[$i]->post_title; 
											} 
											?>
										</a>
									</h2>
								</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<?php if(!empty($solutionsPosts)): ?>
		<div class="abouttagcontentinsigyhts">
			<div class="whitespacetag">
				<h2 class="serviceo">
					Solutions
				</h2>	
				<div class="contentto">
					<ul class="popl">
						<?php for ($i=0; $i < count($solutionsPosts); $i++) {	?>
								<li class="listresult">
									<h2 class="postitle noresultso">
										<a href="<?php echo $solutionsPosts[$i]->guid; ?>">
											<?php $term_obj_list = get_the_terms( $solutionsPosts[$i]->ID, 'monitor-type' );
										$terms_string = join(', ', wp_list_pluck($term_obj_list, 'name'));
										 ?>
											<?php if(get_field('dates',$solutionsPosts[$i]->ID)){
												echo $terms_string ." - ".get_field('dates',$solutionsPosts[$i]->ID);
											} else {
												echo $solutionsPosts[$i]->post_title; 
											} 
											?>
										</a>
									</h2>
								</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
	<?php endif; ?>
	<!-- ELSE STATEMENT -->
<?php } ?>

<?php
die();